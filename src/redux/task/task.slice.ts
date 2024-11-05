import { ListTask, Task, TaskModel } from "./task.state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialTaskState:TaskModel = {
    task: {
        _id: "",
        idUser:"",
        time: "",
        date: "",
        content: "",
        type: ""
    },
    listTask: {
        idUser: "",
        tasks: []
    }
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: initialTaskState,
    reducers: {
        setTask(state, action: PayloadAction<Task>){
            state.task = action.payload;
        },
        setListTask(state, action: PayloadAction<ListTask>){
            state.listTask = action.payload;
        }
    }
})