import React, { Component } from "react";
import uniqid from "uniqid";
import { default as Header } from "../TaskManagerHeader/TaskManagerHeader";
import List from "../List/List";

class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.refTaskManagerHeader = null;
  }

  submitTask(taskLabel) {
    const newTaskLabel = taskLabel.trim();

    if (!newTaskLabel) return;

    // Here newTaskLabel is valid (not empty).

    // Update current state and force recall render()
    // to refresh this section.
    this.setState(
      (prevState, props) => ({
        tasks: [...prevState.tasks, this.addTask(newTaskLabel)]
      }),
      () => this.cleanHeaderInput()
    );
  }

  cleanHeaderInput() {
    this.refTaskManagerHeader.refInputInsertTask.value = "";
  }

  /**
   * Add task.
   *
   * @param {string} newTaskLabel
   */
  addTask(newTaskLabel) {
    return {
      id: uniqid(),
      text: newTaskLabel,
      isTodoStatus: true
    };
  }

  removeTask(taskId) {
    console.log("DEBUG removeTask", taskId);
  }

  updateTaskStatus(taskId) {
    console.log("DEBUG updateTaskStatus", taskId);
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className="TaskManager">
        <Header
          returnInputValue={newTaskLabel => this.submitTask(newTaskLabel)}
          ref={node => (this.refTaskManagerHeader = node)}
        />
        <List
          tasks={tasks}
          onRemoveClick={taskId => this.removeTask(taskId)}
          onChangeClick={taskId => this.updateTaskStatus(taskId)}
        />
      </div>
    );
  }
}

export default TaskManager;
