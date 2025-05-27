import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "../Task";

const InProgress = ({ toggleRefresh }) => {
  const [inProgress, setInProgress] = useState([]);

  const fetchTasks = async () => {
    await axios
      .get("http://localhost:8080/api/tasks")
      .then((response) => {
        const responseData = response.data.filter(
          (task) => task.status === "inProgress"
        );
        setInProgress(responseData);
      })
      .catch((error) =>
        console.error("Error fetching in-progress tasks:", error)
      );
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task._id}`, {
        status: "inProgress",
      });
      //   fetchTasks();
      toggleRefresh();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  useEffect(() => {
    fetchTasks();
  }, [toggleRefresh]);

  return (
    <div
      className="container border border-primary rounded p-3 mt-3"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-center bg-primary text-black p-3 mb-3 rounded shadow mt-3 ">
        <h1>In Progress</h1>
      </div>
      <div className="container">
        {inProgress.length === 0 ? (
          <div className="text-center">
            <h2>No In Progress Items Available</h2>
          </div>
        ) : (
          <ul className="list-group">
            {inProgress.map((item, index) => (
              <Task key={index} task={item} onDragStart={handleDragStart} color={"yellow-300"} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InProgress;
