import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class TaskManagerHeader extends Component {
  constructor(props) {
    super(props);
    this.refInputInsertTask = null;
  }

  render() {
    const { returnInputValue } = this.props;
    return (
      <Fragment>
        <input
          type="text"
          name="insertTask"
          ref={input => {
            this.refInputInsertTask = input;
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              returnInputValue(this.refInputInsertTask.value);
            }
          }}
        />
        <button
          onClick={e => {
            const taskLabel = this.refInputInsertTask.value;
            returnInputValue(taskLabel);
          }}
        >
          Insert task
        </button>
      </Fragment>
    );
  }
}

TaskManagerHeader.propTypes = {
  returnInputValue: PropTypes.func
};

export default TaskManagerHeader;
