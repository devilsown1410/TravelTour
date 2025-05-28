import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
const Project=()=>{
    const navigate= useNavigate();
    const [Projects, setProjects] = useState([]);
    const fetchProjects=async()=>{
        try{
            const response = await fetch("http://localhost:8080/api/projects");
            const data = await response.json();
            setProjects(data);
        }
        catch(error){
            console.error("Error fetching projects:", error);
        }
    }
    const handleProjectClick = (projectId) => {
        console.log("Project clicked:", projectId);
        navigate(`/project/${projectId}`);
    };
    useState(() => {
        fetchProjects();
    }, []);
    return(
        <div className="container mx-auto p-4 bg bg-black-100">
            <h1 className="text-2xl font-bold mb-8 text-center ">Project Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
                {Projects.map((project) => (
                    <div key={project._id} className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-amber-50 hover:scale-105" onClick={handleProjectClick.bind(null, project._id)}>
                        <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                        <p className="text-gray-500">Created at: {new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Project;