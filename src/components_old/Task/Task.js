import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Task.css";

const Task = ({ id, text, isTodoStatus, onChangeClick, onRemoveClick }) => {
  const labelClass = classNames("card-text", {
    todo: isTodoStatus,
    done: !isTodoStatus
  });
  return (
    <div className="project-card">
      <p className={labelClass} onClick={() => onChangeClick(id)}>
        {text}
      </p>
      <span className="card-remove" onClick={() => onRemoveClick(id)}>
        X
      </span>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  isTodoStatus: PropTypes.bool,
  onChangeClick: PropTypes.func,
  onRemoveClick: PropTypes.func
};

export default Task;
