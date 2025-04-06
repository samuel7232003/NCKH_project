import { DailyTask } from "../redux/dailyTask/dailyTask.state";
import { apiInstance } from "./api";

export async function addDailyTask(dailyTask: DailyTask):Promise<any> {
    try {
        const respone = await apiInstance.post('/addDailyTask', dailyTask);
        return respone;
    } catch (error) {
       console.log(error);
    }
}

export async function getDailyTasks(id: string):Promise<any> {
    try {
        const respone = await apiInstance.get(`/listDailyTask?id=${id}`);
        return respone;
    } catch (error) {
       console.log(error);
    }
}

export async function deleteDailyTask(id: string){
    try {
        const respone = await apiInstance.get(`/removeDailyTask?id=${id}`);
        return respone;
    } catch (error) {
       console.log(error);
    }
}