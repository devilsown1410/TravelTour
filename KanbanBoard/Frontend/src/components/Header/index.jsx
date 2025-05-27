import React from "react";

const Header=({project=project,handleLeadChange})=>{
    // console.log(project.lead);
    // add a all option to the select dropdown
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
    return(
        <div className="flex justify-items-end items-center p-4 bg-gray-800 text-white" style={{ width: "100%" }}>
        <div className="text-center bg-primary text-white p-3 mb-3 rounded shadow mt-3">  
            <h1>{project.name}</h1>
            <p className="text-gray-500">Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="container mx-auto p-4 ">
            <select className="border border-primary rounded shadow p-1" onChange={(e) => handleLeadChange(e.target.value)}>
            <option value="" className="text-zinc-950">Select Lead</option>
            <option value="all" className="text-zinc-950">All</option>
                {project.lead?.map((member, index) => (
                    <option key={index} value={member} className="text-zinc-950">
                        {member}
                    </option>
                ))}
            </select>
            </div>
        </div>
    )
}
export default Header;