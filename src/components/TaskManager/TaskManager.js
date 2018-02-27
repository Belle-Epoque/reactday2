import React, { Component } from "react";
import List from "../List/List";
import uniqid from "uniqid";

class TaskManager extends Component {
  constructor(props) {
    super(props);

    // Init state.
    this.state = this.initState();

    // Declare ref dom object.
    this.refTextInput = null;

    this.debugReactLifeCycle("constructor");
  }

  /**
   * init state
   */
  initState() {
    return {
      lastInputTextValue: "",
      tasks: []
    };
  }

  /**
   * componentWillMount().
   *
   * This is the only lifecycle hook called on serverside rendering.
   * Called before render().
   */
  componentWillMount() {
    this.debugReactLifeCycle("componentWillMount");
  }

  /**
   * componentDidMount().
   *
   * Called immediately after a component is mounted (after render()).
   */
  componentDidMount() {
    this.debugReactLifeCycle("componentDidMount", {
      refTextInput: this.refTextInput
    });

    // Good place to:
    // - call external api from client.
    // - manipulate dom node object like this.inputText
    // - use setState()
    // - add subscription to event (add listener, etc.).
  }

  /**
   * componentWillUnmount().
   */
  componentWillUnmount() {
    this.debugReactLifeCycle("componentWillUnmount");

    // Good place to:
    // - remove subscription to event (remove listener, etc.).
  }

  /**
   * componentWillReceiveProps().
   */
  componentWillReceiveProps(nextProps) {
    this.debugReactLifeCycle("componentWillReceiveProps", {
      nextProps
    });

    // Good place to compare current this.props and nextProps
    // and setState if you want.
    if (
      this.props.taskAction !== nextProps.taskAction &&
      nextProps.taskAction === "resetTaskManager"
    ) {
      // If parent component changes taskAction value
      // and taskAction value is 'resetTaskManager'
      // then we reset TaskManager state.
      this.setState(this.initState());
    }
  }

  /**
   * shouldComponentUpdate().
   *
   * See https://blog.eleven-labs.com/fr/optimiser-son-application-react/
   */
  shouldComponentUpdate(nextProps, nextState) {
    this.debugReactLifeCycle("shouldComponentUpdate", {
      nextProps,
      nextState
    });

    // Allow re-render if this method return true.
    return nextState.lastInputTextValue !== "dontRefreshRenderNow";
  }

  /**
   * componentWillUpdate().
   *
   * See https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/tapping_into_componentwillupdate.html
   */
  componentWillUpdate(nextProps, nextState) {
    // Never call this.setState() here (infinite loop).

    this.debugReactLifeCycle("componentWillUpdate", {
      nextProps,
      nextState
    });
  }

  /**
   * componentDidUpdate().
   *
   * See https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/postrender_with_componentdidupdate.html
   */
  componentDidUpdate(nextProps, nextState) {
    this.debugReactLifeCycle("componentDidUpdate", {
      nextProps,
      nextState
    });
  }

  /**
   * Debug react lifecycle method.
   *
   * @param {string} methodName
   * @param {object} extraDataToDebug
   */
  debugReactLifeCycle(methodName, extraDataToDebug = {}) {
    console.log(`DEBUG lifecycle ${methodName}`, {
      state: this.state,
      props: this.props,
      ...extraDataToDebug
    });
  }

  /**
   * Submit new task.
   *
   * @param {string} label
   */
  submitNewTask(label) {
    // Remove space before and after label.
    const myLabel = label.trim();

    if (!myLabel) {
      // Skip add task when label is empty.
      return;
    }

    // myLabel is valid.

    const { tasks } = this.state;
    this.setState(
      {
        lastInputTextValue: myLabel,
        tasks: [...tasks, this.addTask(myLabel)]
      },
      () => {
        // Empty input text after submit.
        this.refTextInput.value = "";
      }
    );
  }

  /**
   * Add task.
   *
   * @param {string} label
   */
  addTask(label) {
    return {
      id: uniqid(),
      text: label,
      isTodoStatus: true
    };
  }

  /**
   * When a user clicks on label (toggle isTodoStatus).
   *
   * @param {string} taskId
   */
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

  /**
   * When a user clicks on the remove button.
   *
   * @param {string} taskId
   */
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
