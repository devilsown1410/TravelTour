import React from "react";

const Task = ({ task, onDragStart, color="blue" }) => {

  return (
    <div
      className={`mb-3 border border-primary bg-${color} rounded-xl p-3 shadow-lg hover:shadow-2xl hover:scale-105 cursor-pointer transition-transform duration-300`}
    style={{backgroundColor: color}}
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className={`card-body bg-${color}`}>
        <h5 className="card-title">Title-{task.name}</h5>
        <p className="card-text">Description-{task.description}</p>
        <p className="card-text">
          <small className="text-muted">Lead: {task.lead}</small>
        </p>
      </div>
    </div>
  );
};
export default Task;
