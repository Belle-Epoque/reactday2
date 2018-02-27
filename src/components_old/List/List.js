import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Task from "../Task/Task";

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks, onChangeClick, onRemoveClick } = this.props;
    return (
      <Fragment>
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            onChangeClick={onChangeClick}
            onRemoveClick={onRemoveClick}
          />
        ))}
      </Fragment>
    );
  }
}

List.propTypes = {
  tasks: PropTypes.array
};

export default List;
