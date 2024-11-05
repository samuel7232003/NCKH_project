import { ThunkAction } from "redux-thunk";
import { taskSlice } from "./task.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { ListTask, Task } from "./task.state";
import { addTask, getTasks } from "../../service/taskService";

export const taskAction = taskSlice.actions;

export const getListTask = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    function compareDates(a:Task, b:Task){
        return (new Date(a.date)).getTime() - (new Date(b.date)).getTime();
    }
    return async (dispatch, getState) => {
        const respone :Task[] = await getTasks(id);
        const data:ListTask = {idUser: id, tasks: respone};
        const sortData:ListTask = {...data, tasks: data.tasks.sort(compareDates)};
        dispatch(taskAction.setListTask(sortData));
    }
}

export const addNewTask = (task: Task): ThunkAction<void, RootState, unknown, AnyAction> => {
    function compareDates(a:Task, b:Task){
        return (new Date(a.date)).getTime() - (new Date(b.date)).getTime();
    }
    return async (dispatch, getState) =>{
        const respone = await addTask(task);
        console.log(respone);
        const data:ListTask = {idUser: task.idUser, tasks: respone};
        const sortData:ListTask = {...data, tasks: data.tasks.sort(compareDates)};
        dispatch(taskAction.setListTask(sortData));
    }
}