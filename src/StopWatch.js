//@flow
import React from "react";
import { formatElapsedTime, twoDigits } from "./utils";
import "./StopWatch.css";
type Props = {
  tick: number,
};
type State = {
  laps: Array<number>,
  isStopped: boolean,
  currentLapElapsedTime: number,
  intervalId: number | null,
};
class StopWatch extends React.Component<Props, State> {
  initialState = {
    isStopped: false,
    laps: [],
    currentLapElapsedTime: 0,
    intervalId: null,
  };
  constructor(props: Props) {
    super(props);
    this.state = this.initialState;
    //bindings
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.lap = this.lap.bind(this);
    this.resume = this.resume.bind(this);
    this.reset = this.reset.bind(this);
    this.renderControlBar = this.renderControlBar.bind(this);
  }
  start = () => {
    const intervalId = setInterval(() => {
      this.setState((prevState, props) => ({
        ...prevState,
        currentLapElapsedTime: prevState.currentLapElapsedTime + props.tick,
      }));
    }, this.props.tick);

    this.setState(prevState => ({
      ...prevState,
      intervalId,
      isStopped: false,
    }));
  };
  stop = () => {
    const { intervalId } = this.state;
    intervalId !== null && clearInterval(intervalId);
    this.setState((prevState, props) => ({
      isStopped: true,
    }));
  };
  lap = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      laps: [...prevState.laps, prevState.currentLapElapsedTime],
      currentLapElapsedTime: 0,
    }));
  };
  resume = () => {
    this.start();
  };
  reset = () => {
    this.setState(this.initialState);
  };
  renderControlBar = () => {
    const { isStopped, laps, intervalId } = this.state;
    if (laps.length === 0 && intervalId === null) {
      return <button onClick={this.start}>Start</button>;
    } else if (!isStopped) {
      return [
        <button onClick={this.stop}>Stop</button>,
        <button onClick={this.lap}>Lap</button>,
      ];
    } else {
      return [
        <button onClick={this.resume}>Resume</button>,
        <button onClick={this.reset}>Reset</button>,
      ];
    }
  };
  render() {
    const { laps, currentLapElapsedTime } = this.state;
    const totalElapsedTime = laps.reduce((a, b) => a + b, 0);
    return (
      <div className="container">
        <h1>{formatElapsedTime(totalElapsedTime)}</h1>
        <h3>{formatElapsedTime(currentLapElapsedTime)}</h3>
        <table className="summary-table">
          {laps.map((lap, index) => {
            const aggregatedElapsedTime = laps
              .slice(0, index + 1)
              .reduce((a, b) => a + b, 0);
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{formatElapsedTime(lap)}</td>
                <td>{formatElapsedTime(aggregatedElapsedTime)}</td>
              </tr>
            );
          })}
        </table>
        <div className="control-bar">{this.renderControlBar()}</div>
      </div>
    );
  }
}
//$FlowFixMe
StopWatch.defaultProps = {
  tick: 10,
};
export default StopWatch;
