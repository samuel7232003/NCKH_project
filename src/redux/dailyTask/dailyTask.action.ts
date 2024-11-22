import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { dailyTaskSlice } from "./dailyTask.slice";
import { DailyTask, ListDailyTask } from "./dailyTask.state";
import { addDailyTask, deleteDailyTask, getDailyTasks } from "../../service/dailyTaskService";

export const dailyTaskAction = dailyTaskSlice.actions;

export const getListDailyTask = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const respone :DailyTask[] = await getDailyTasks(id);
        const data:ListDailyTask = {idUser: id, dailyTasks: respone};
        dispatch(dailyTaskAction.setListDailyTask(data));
    }
}

export const addNewDailyTask = (dailyTask: DailyTask): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) =>{
        await addDailyTask(dailyTask);
        const res :DailyTask[] = await getDailyTasks(dailyTask.idUser);
        const data:ListDailyTask = {idUser: dailyTask.idUser, dailyTasks: res};
        dispatch(dailyTaskAction.setListDailyTask(data));
    }
}

export const removeDailyTask = (id: string, idUser: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        await deleteDailyTask(id);
        const res :DailyTask[] = await getDailyTasks(idUser);
        const data:ListDailyTask = {idUser: idUser, dailyTasks: res};
        dispatch(dailyTaskAction.setListDailyTask(data));
    }
}