import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "../Task";

const Approved = ({ toggleRefresh }) => {
  const [approved, setApproved] = useState([]);

  const fetchTasks = async () => {
    await axios
      .get("http://localhost:8080/api/tasks")
      .then((response) =>
        setApproved(response.data.filter((task) => task.status === "approved"))
      )
      .catch((error) => console.error("Error fetching approved tasks:", error));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const task = JSON.parse(e.dataTransfer.getData("task"));
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task._id}`, {
        status: "approved",
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
        <h1>Approved</h1>
      </div>
      <div className="container">
        {approved.length === 0 ? (
          <div className="text-center">
            <h2>No Approved Items Available</h2>
          </div>
        ) : (
          <ul className="list-group">
            {approved.map((item, index) => (
              <Task key={index} task={item} onDragStart={handleDragStart} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Approved;
