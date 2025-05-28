import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import Phase from "../../components/Phase";
import axios from "axios";

const Board = () => {
  const projectId = window.location.pathname.split("/").pop();
  const [refresh, setRefresh] = useState(false);
  const [project, setProject] = useState({});
  const [todos, setTodos] = useState([]);
  const [currLead, setcurrLead] = useState("");

  const toggleRefresh = () => setRefresh(!refresh);

  const handleLeadChange = (lead) => {
    setcurrLead(lead === "all" ? "" : lead);
  }

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      const filtered = response.data.filter((task) => task.project === project._id);
      setTodos(filtered);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [project._id]);

  useEffect(() => {
    if (!projectId || projectId === "undefined") return;

    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, []);

  useEffect(() => {
    if (project._id) {
      fetchTasks();
    }
  }, [fetchTasks]);

  return (
    <>
      <Header project={project} handleLeadChange={handleLeadChange} />
      <div className="flex justify-around items-start flex-row gap-2 p-2 h-screen overflow-y-auto bg-gray-100">
        {["todo", "inProgress", "done", "approved"].map((type, index) => (
          <Phase
            key={index}
            toggleRefresh={toggleRefresh}
            type={type}
            color={
              type === "todo"
                ? "blue-300"
                : type === "inProgress"
                ? "yellow-300"
                : type === "done"
                ? "orange-300"
                : "red-400"
            }
            currLead={currLead}
            project={project}
            tasks={todos}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
