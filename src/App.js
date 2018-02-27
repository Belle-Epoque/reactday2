import React, { Component } from "react";
import TaskManager from "./components/TaskManager/TaskManager";
import Blog from "./components/Blog/Blog";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  /**
   * constructor().
   */
  constructor() {
    super();

    this.state = {
      taskAction: "taskActionFromHome"
    };
  }

  /**
   * Reset task manager.
   */
  resetTaskManager() {
    this.setState({
      taskAction: "resetTaskManager"
    });
  }

  render() {
    const { taskAction } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.resetTaskManager()}>
          Reset task manager
        </button>
        <TaskManager taskAction={taskAction} />
        <Blog />
      </div>
    );
  }
}

export default App;
