import React, { Component } from "react";
import Task from "../Task/Task";

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tasks, onChangeClick, onRemoveClick } = this.props;
    console.log("DEBUG tasks", tasks);
    return (
      <div className="List">
        {tasks.map(task => (
          <Task
            key={task.id}
            {...task}
            onChangeClickTask={onChangeClick}
            onRemoveClickTask={onRemoveClick}
          />
        ))}
      </div>
    );
  }
}

export default List;
