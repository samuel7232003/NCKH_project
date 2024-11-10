import { DailyTask } from "../redux/dailyTask/dailyTask.state";
import { apiInstance } from "./api";

export async function addDailyTask(dailyTask: DailyTask) {
    try {
        const respone = await apiInstance.post('/addDailyTask', dailyTask);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}

export async function getDailyTasks(id: string) {
    try {
        const respone = await apiInstance.get(`/listDailyTask/${id}`);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}

export async function deleteDailyTask(id: string){
    try {
        const respone = await apiInstance.get(`/removeDailyTask/${id}`);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}