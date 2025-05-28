import React from "react";

const Header = ({ project = project, handleLeadChange }) => {
  if (!project || !project.name) {
    return (
      <div className="flex justify-center items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl">Project not found</h1>
      </div>
    );
  }
  if (!project.lead || project.lead.length === 0) {
    return (
      <div className="flex justify-center items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl">No leads available</h1>
      </div>
    );
  }
  return (
    <div className="flex justify-between items-center p-1 bg-gray-800 text-white w-full">
      <div className="bg-primary text-white px-4 py-2 rounded shadow">
        <h1 className="text-lg font-semibold">{project.name}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-white">Filter by Lead:</label>
        <select
          className="border border-primary rounded shadow p-1 bg-white text-black"
          onChange={(e) => handleLeadChange(e.target.value)}
        >
          <option value="all">All</option>
          {project.lead?.map((member, index) => (
            <option key={index} value={member}>
              {member}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Header;
