import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Task from "../Task";

const Phase = ({ toggleRefresh = { toggleRefresh }, type = type, color=color, currLead=currLead,projectId }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState(false);

  const fetchTasks = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/tasks")
      .then((response) =>{
        setTodos(response.data.filter((task) => task.status === type && task.project== projectId))
        if(currLead){
            setTodos((prevTodos) =>
                prevTodos.filter((task) => task.lead === currLead)
        );}
  })
      .catch((error) => console.error(`Error fetching ${type}:`, error));
  }, [type, currLead, projectId]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task._id}`, {
        status: type,
      });
      toggleRefresh();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const AddTask = async ({ task, description, lead }) => {
    await axios
      .post("http://localhost:8080/api/tasks", {
        name: task,
        description,
        lead,
        project: projectId,
      })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error(`There was an error adding the ${type}!`, error);
      });
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  useEffect(() => {
    fetchTasks();
  }, [toggleRefresh, fetchTasks]);
  return (
    <div
      className="container border border-primary rounded p-3 mt-3 text-zinc-950"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center bg-primary text-black p-3 mb-3 rounded shadow mt-3 ">
        <h1>{type.toUpperCase()}</h1>
      </div>
      <div className="container">
        {todos.length === 0 ? (
          <div className="text-center">
            <h2>No {type} Available</h2>
          </div>
        ) : (
          <div className="list-group">
            {todos.map((task, index) => (
              <Task
                key={index}
                task={task}
                onDragStart={handleDragStart}
                color={color}
              />
            ))}
          </div>
        )}
      </div>
      {newTask && (
        <div className="mt-3 bg-amber-100 p-3 flex justify-center border-1 rounded shadow text-zinc-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const task = e.target.task.value;
              const description = e.target.description.value;
              const lead = e.target.lead.value;
              AddTask({ task, description, lead });
              e.target.reset();
            }}
          >
            <div className="mb-3 ">
              <input
                type="text"
                name="task"
                className="form-control border border-primary rounded shadow p-1"
                placeholder="Task"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="description"
                className="form-control border border-primary rounded shadow p-1"
                placeholder="Description"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="lead"
                className="form-control border border-primary rounded shadow p-1"
                placeholder="Lead"
                required
              />
            </div>
            <button
              type="submit"
              className="btn border-t-cyan-700 border border-primary rounded shadow p-2 cursor-pointer bg-amber-100 hover:bg-amber-200"
              style={{ width: "100%" }}
            >
              Add Task
            </button>
          </form>
        </div>
      )}
      {type === "todo" && (
        <button
          className="btn btn-secondary mt-3 border border-primary rounded shadow p-2 cursor-pointer bg-amber-100 hover:bg-amber-200"
          style={{ width: "100%" }}
          onClick={() => setNewTask(!newTask)}
        >
          {newTask ? "Cancel" : "Add New Task"}
        </button>
      )}
    </div>
  );
};

export default Phase;
