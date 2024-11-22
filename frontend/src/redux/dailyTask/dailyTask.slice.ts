import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DailyTask, DailyTaskModel, ListDailyTask } from "./dailyTask.state";

export const initialDailyTaskState:DailyTaskModel = {
    dailyTask: {
        _id: "",
        idUser:"",
        start: "",
        end: "",
        content: "",
        type: "",
        color:"",
    },
    listDailyTask: {
        idUser: "",
        dailyTasks: []
    }
}

export const dailyTaskSlice = createSlice({
    name: 'task',
    initialState: initialDailyTaskState,
    reducers: {
        setDailyTask(state, action: PayloadAction<DailyTask>){
            state.dailyTask = action.payload;
        },
        setListDailyTask(state, action: PayloadAction<ListDailyTask>){
            state.listDailyTask = action.payload;
        }
    }
})