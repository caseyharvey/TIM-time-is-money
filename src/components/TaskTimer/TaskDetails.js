import React from 'react';
import Button from '../Button';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import TimerDisplay from '../TimerDisplay';
import DollarValueDisplay from '../DollarValueDisplay';
import { stopTask } from '../../actions';

class TaskDetails extends React.Component {
  render() {
    const {
      stopTask,
      taskName,
      taskTimerValue,
      taskDollarValue,
      timerRunning
    } = this.props;

    return (
      <>
        <div className='taskDetails'>
          <div className='nameAndValue'>
            <div className='taskName'>task: {taskName}</div>
            <DollarValueDisplay dollarValue={taskDollarValue} />
          </div>
          <div className='timerDisplay'>
            <TimerDisplay timerValue={taskTimerValue} />
            <Button
              disabled={!timerRunning}
              action={stopTask}
              name='complete'
              className='blue'
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskName: state.taskTimer.taskName,
    timerRunning: state.taskTimer.timerRunning,
    taskTimerValue: state.taskTimer.timerValue,
    taskDollarValue: state.taskTimer.taskDollarValue
  };
};
export default connect(mapStateToProps, {
  stopTask,
  initialize
})(TaskDetails);
