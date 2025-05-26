import React from "react";

const Task = ({ task, onDragStart }) => {
  return (
    <div
      className="card mb-3 border border-primary shadow rounded-xl p-3 bg-amber-100 text-zinc-950 duration-300 hover:shadow-xl scale-105 hover:bg-amber-200 cursor-pointer transform transition-transform"
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
    >
      <div className="card-body">
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
