import React, { Component } from "react";
import List from "../List/List";
import uniqid from "uniqid";

class TaskManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };

    this.refTextInput = null;
  }

  submitNewTask(label) {
    const myLabel = label.trim();

    if (!myLabel) {
      return;
    }

    const { tasks } = this.state;
    this.setState(
      {
        tasks: [...tasks, this.addTask(myLabel)]
      },
      () => {
        this.refTextInput.value = "";
      }
    );
  }

  addTask(label) {
    return {
      id: uniqid(),
      text: label,
      isTodoStatus: true
    };
  }

  onChangeTodoStatus(taskId) {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.map((item, index) => {
        if (item.id !== taskId) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // isTodoStatus switcher (true/false).
        return {
          ...item,
          isTodoStatus: !item.isTodoStatus
        };
      })
    });
  }

  removeTask(taskId) {
    const { tasks } = this.state;
    this.setState({
      tasks: tasks.filter((item, index) => item.id !== taskId)
    });
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className="TaskManager">
        <input
          name="insert"
          ref={text => (this.refTextInput = text)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.submitNewTask(this.refTextInput.value);
            }
          }}
        />
        <button onClick={e => this.submitNewTask(this.refTextInput.value)}>
          Add
        </button>
        <List
          tasks={tasks}
          onChangeClick={taskId => this.onChangeTodoStatus(taskId)}
          onRemoveClick={taskId => this.removeTask(taskId)}
        />
      </div>
    );
  }
}

export default TaskManager;
