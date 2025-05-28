import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../Task";

const Phase = ({ toggleRefresh, type, color, currLead, project, tasks }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState(false);
  const [leadInput, setLeadInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (currLead && currLead !== "all") {
      setTodos(
        tasks.filter((task) => task.status === type && task.lead === currLead)
      );
      return;
    }
    setTodos(tasks.filter((task) => task.status === type));
  }, [tasks, type, currLead]);

  useEffect(() => {
    if (!leadInput) {
      setSuggestions([]);
      return;
    }
    if (project.lead?.length) {
      setSuggestions(
        project.lead.filter((lead) =>
          lead.toLowerCase().includes(leadInput.toLowerCase())
        )
      );
    }
  }, [leadInput, project.lead]);

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

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const AddTask = async ({ task, description, lead }) => {
    try {
      await axios.post("http://localhost:8080/api/tasks", {
        name: task,
        description,
        lead,
        project: project._id,
        status: type,
      });
      toggleRefresh();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div
      className="container border border-primary rounded p-3 mt-3 text-zinc-950 w-1/4 bg-white"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={`text-center bg-${color} text-black p-3 mb-3 rounded shadow`}
      >
        <h1>{type.toUpperCase()}</h1>
      </div>
      {todos.length === 0 ? (
        <div className="text-center">
          <h2>No {type} Available</h2>
        </div>
      ) : (
        <div className="overflow-y-auto h-96 space-y-2">
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
      {newTask && (
        <form
          className="mt-4 bg-gray-100 p-3 rounded shadow"
          onSubmit={(e) => {
            e.preventDefault();
            if (!project.lead.includes(leadInput)) {
              alert("Please select a valid lead.");
              return;
            }
            const task = e.target.task.value;
            const description = e.target.description.value;
            const lead = leadInput;
            AddTask({ task, description, lead });
            setLeadInput("");
            e.target.reset();
            setNewTask(false);
          }}
        >
          <input
            name="task"
            className="form-control mb-2 p-1 w-full border rounded"
            placeholder="Task"
            required
          />
          <input
            name="description"
            className="form-control mb-2 p-1 w-full border rounded"
            placeholder="Description"
            required
          />
          <input
            name="lead"
            className="form-control mb-2 p-1 w-full border rounded"
            placeholder="Lead"
            value={leadInput}
            onChange={(e) => setLeadInput(e.target.value)}
            required
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border rounded mt-1">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-1 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setLeadInput(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className="mt-2 w-full bg-blue-200 hover:bg-blue-300 p-2 rounded"
            disabled={!suggestions.includes(leadInput)}
          >
            Add Task
          </button>
        </form>
      )}
      {type === "todo" && (
        <button
          className="mt-3 w-full bg-green-100 hover:bg-green-200 p-2 rounded"
          onClick={() => setNewTask(!newTask)}
        >
          {newTask ? "Cancel" : "Add New Task"}
        </button>
      )}
    </div>
  );
};

export default Phase;
