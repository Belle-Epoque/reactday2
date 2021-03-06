import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Task.css";

// props in params (id, text, etc.).
const Task = ({
  id,
  text,
  isTodoStatus,
  onChangeClickTask,
  onRemoveClickTask
}) => {
  // Display class (todo or done) if condition is true.
  const labelClass = classNames("card-text", {
    todo: isTodoStatus,
    done: !isTodoStatus
  });
  return (
    <div className="project-card">
      <p className={labelClass} onClick={() => onChangeClickTask(id)}>
        {text}
      </p>
      <span className="card-remove" onClick={() => onRemoveClickTask(id)}>
        X
      </span>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isTodoStatus: PropTypes.bool.isRequired,
  onChangeClickTask: PropTypes.func.isRequired,
  onRemoveClickTask: PropTypes.func.isRequired
};

export default Task;
