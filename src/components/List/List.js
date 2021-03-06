import React, { Component } from "react";
import Task from "../Task/Task";

class List extends Component {
  render() {
    const { tasks, onChangeClick, onRemoveClick } = this.props;
    console.log("DEBUG tasks", tasks);
    // {...task} => On récupère les différentes propriétés de task en tant que props
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
