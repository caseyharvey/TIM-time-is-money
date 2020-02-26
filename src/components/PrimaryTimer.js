import React from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import ResetButton from './ResetButton';
import TimerDisplay from './TimerDisplay';
import StartStopButton from './StartStopButton';
import { initialize } from 'redux-form';
import DollarValueDisplay from './DollarValueDisplay';
import {
  toggleTaskTimer,
  resetPrimaryTimer,
  togglePrimaryTimer,
  togglePrimaryResetModal
} from '../actions';

class PrimaryTimer extends React.Component {
  startTimer = () => {
    this.props.togglePrimaryTimer('start');
    this.props.initialize('HourlyRateInput');
  };
  stopTimer = () => {
    this.props.togglePrimaryTimer('stop');
    this.props.toggleTaskTimer('stop');
    this.props.initialize('HourlyRateInput');
  };
  resetAll = () => {
    this.stopTimer();
    this.props.resetPrimaryTimer();
  };
  confirmReset = () => {
    this.props.togglePrimaryResetModal();
  };

  render() {
    const {
      isVisible,
      ratePerSecond,
      hasRateBeenSet,
      primaryTimerValue,
      primaryTimerRunning,
      togglePrimaryResetModal
    } = this.props;

    const dollarValue = primaryTimerValue * ratePerSecond;
    const stopClass = primaryTimerRunning ? 'stopButton' : 'hide stopButton';
    const warningClass = !hasRateBeenSet
      ? 'hide enterHourlyRateWarning'
      : 'enterHourlyRateWarning';

    return (
      <>
        <div className='moneyTimerContainer'>
          <StartStopButton
            start={this.startTimer}
            stop={this.stopTimer}
            name='primary timer'
            stopClass={stopClass}
            warningClass={warningClass}
          />
          <DollarValueDisplay dollarValue={dollarValue} />
        </div>
        <div className='timerDisplayContainer'>
          <TimerDisplay timerValue={primaryTimerValue} />
          <ResetButton action={this.confirmReset} name='reset' />
        </div>
        <Modal
          confirm={this.resetAll}
          cancel={togglePrimaryResetModal}
          isVisible={isVisible ? '' : 'hide'}
          message='this will reset the primary timer and your hourly rate'
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ratePerSecond: state.rate.perSecond,
    hasRateBeenSet: state.rate.hasRateBeenSet,
    isVisible: state.modal.showPrimaryResetModal,
    primaryTimerValue: state.primaryTimer.timerValue,
    primaryTimerRunning: state.primaryTimer.timerRunning
  };
};

export default connect(mapStateToProps, {
  initialize,
  toggleTaskTimer,
  resetPrimaryTimer,
  togglePrimaryTimer,
  togglePrimaryResetModal
})(PrimaryTimer);
