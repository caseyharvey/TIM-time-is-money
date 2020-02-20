import React from "react";
import { connect } from "react-redux";

class TimerDisplay extends React.Component {
  render() {
    const currentTimerValue = this.props.mainTimerValue;
    const seconds = ("0" + (currentTimerValue % 60)).slice(-2);
    const minutes = ("0" + (Math.floor(currentTimerValue / 60) % 60)).slice(-2);
    const hours = ("0" + (Math.floor(currentTimerValue / 3600) % 24)).slice(-2);

    return (
      <div className="timerDisplay">
        time: {hours}:{minutes}:{seconds}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mainTimerValue: state.mainTimerValue,
    mainTimerRunning: state.mainTimerRunning
  };
};

export default connect(mapStateToProps)(TimerDisplay);