import React from "react";
import { connect } from "react-redux";
import TimerDisplay from "./TimerDisplay";
import { incrementMainTimer, setMainTimerRunning } from "../actions";

class MainMoneyTimer extends React.Component {
  startTimer = () => {
    this.props.setMainTimerRunning();
    this.interval = setInterval(() => {
      this.props.incrementMainTimer();
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.interval);
    this.props.setMainTimerRunning();
  };

  render() {
    const currentDollarValue =
      this.props.mainTimerValue * this.props.ratePerSecond;

    return (
      <div className="mainMoneyTimerContainer">
        <div className="stopStartContainer">
          <button onClick={this.startTimer}>Start main timer</button>
          <button
            className={
              this.props.mainTimerRunning ? "stopButton" : "hide stopButton"
            }
            onClick={this.stopTimer}
          >
            Stop main timer
          </button>
        </div>
        <TimerDisplay />
        <div className="mainMoneyTimerDisplay">
          ${Math.round((currentDollarValue + Number.EPSILON) * 100) / 100}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hourlyRate: state.hourlyRate,
    mainTimerValue: state.mainTimerValue,
    ratePerSecond: state.ratePerSecond,
    mainTimerRunning: state.mainTimerRunning
  };
};

export default connect(mapStateToProps, {
  incrementMainTimer,
  setMainTimerRunning
})(MainMoneyTimer);