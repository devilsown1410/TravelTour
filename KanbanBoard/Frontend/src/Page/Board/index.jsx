import React, { useEffect } from "react";
// import Todo from "../../components/Todo/Todo";
import Header from "../../components/Header";
import { useState } from "react";
import Phase from "../../components/Phase";

const Board = () => {
  const projectId = window.location.pathname.split("/").pop();
  const [refresh, setRefresh] = useState(false);
  const [project, setProject] = useState({});
  const toggleRefresh = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/projects/" + projectId
        );
        const data = await response.json();
        console.log(data);
        setProject(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, [projectId]);
  const [currLead, setcurrLead] = useState("");
  const handleLeadChange = (e) => {
    setcurrLead(e);
  };
  return (
    <>
      <Header project={project} handleLeadChange={handleLeadChange} />
      <div
        className="flex justify-around items-start flex-row border-1 gap-2 p-2 h-screen overflow-y-auto bg-gray-100
      "
      >
        <Phase
          toggleRefresh={toggleRefresh}
          type="todo"
          color={"blue-300"}
          currLead={currLead}
          project={project}
        />
        <Phase
          toggleRefresh={toggleRefresh}
          type="inProgress"
          color={"yellow-300"}
          currLead={currLead}
          project={project}
        />
        <Phase
          toggleRefresh={toggleRefresh}
          type="done"
          color={"orange-300"}
          currLead={currLead}
          project={project}
        />
        <Phase
          toggleRefresh={toggleRefresh}
          type="approved"
          color={"red-400"}
          currLead={currLead}
          project={project}
        />
      </div>
    </>
  );
};

export default Board;
