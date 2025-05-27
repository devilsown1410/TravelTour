import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    lead:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:["todo","in-progress","done","approved"],
        default:"todo",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true,
    },
});
const Task=mongoose.model("Task",taskSchema);
export default Task;