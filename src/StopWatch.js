//@flow
import React from "react";
import { formatElapsedTime } from "./utils";
import "./StopWatch.css";
type Props = {
  tick: number
};
type State = {
  laps: Array<number>,
  isStopped: boolean,
  currentLapElapsedTime: number
};
class StopWatch extends React.Component<Props, State> {
  initialState = {
    isStopped: false,
    laps: [],
    currentLapElapsedTime: 0
  };
  constructor(props: Props) {
    super(props);
    this.state = this.initialState;
    this.intervalId = null;
  }
  start = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState, props) => ({
        ...prevState,
        currentLapElapsedTime: prevState.currentLapElapsedTime + props.tick
      }));
    }, this.props.tick);

    this.setState(prevState => ({
      ...prevState,
      isStopped: false
    }));
  };
  stop = () => {
    this.intervalId !== null && clearInterval(this.intervalId);
    this.setState((prevState, props) => ({
      isStopped: true
    }));
  };
  lap = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      laps: [prevState.currentLapElapsedTime, ...prevState.laps],
      currentLapElapsedTime: 0
    }));
  };
  resume = () => {
    this.start();
  };
  reset = () => {
    this.setState(this.initialState);
    if(this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  };
  renderControlBar = () => {
    const { isStopped, laps } = this.state;
    if (laps.length === 0 && this.intervalId === null) {
      return <button onClick={this.start}>Start</button>;
    } else if (!isStopped) {
      return [
        <button key="stop" onClick={this.stop}>Stop</button>,
        <button key="lap" onClick={this.lap}>Lap</button>
      ];
    } else {
      return [
        <button key="resume" onClick={this.resume}>Resume</button>,
        <button key="reset" onClick={this.reset}>Reset</button>
      ];
    }
  };
  render() {
    const { laps, currentLapElapsedTime } = this.state;
    const totalElapsedTime =
      laps.reduce((a, b) => a + b, 0) + currentLapElapsedTime;
    return (
      <div className="container">
        <h1>{formatElapsedTime(totalElapsedTime)}</h1>
        <h3>{formatElapsedTime(currentLapElapsedTime)}</h3>
        <div className="control-bar">{this.renderControlBar()}</div>
        {laps.length > 0 && <table className="summary-table">
          <tbody>
            {laps.map((lap, index) => {
              const i = laps.length - index;
              const aggregatedElapsedTime = laps
                .slice(0, i + 1)
                .reduce((a, b) => a + b, 0);
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{formatElapsedTime(lap)}</td>
                  <td>{formatElapsedTime(aggregatedElapsedTime)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>}
      </div>
    );
  }
}
//$FlowFixMe
StopWatch.defaultProps = {
  tick: 10
};
export default StopWatch;
