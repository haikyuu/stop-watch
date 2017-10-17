//@flow
import React from "react";
type Props = {};
type State = {
  laps: Array<number>,
  isStopped: boolean,
  currentLapElapsedTime: number,
};
class StopWatch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isStopped: true,
      laps: [],
      currentLapElapsedTime: 0,
    };
    //bindings
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.lap = this.lap.bind(this);
    this.resume = this.resume.bind(this);
    this.reset = this.reset.bind(this);
    this.renderControlBar = this.renderControlBar.bind(this);
  }
  start() {}
  stop() {}
  lap() {}
  resume() {}
  reset() {}
  renderControlBar() {
    const { isStopped, laps } = this.state;
    if (laps.length === 0) {
      return <button onClick={this.start}>Start</button>;
    } else if (isStopped) {
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
  }
  render() {
    const { laps, currentLapElapsedTime } = this.state;
    const totalElapsedTime = laps.reduce((a, b) => a + b, 0);
    return (
      <div>
        <h1>{totalElapsedTime}</h1>
        <h3>{currentLapElapsedTime}</h3>
        {this.renderControlBar()}
      </div>
    );
  }
}
