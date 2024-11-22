import { Task } from "../redux/task/task.state";
import { apiInstance } from "./api";

export async function addTask(task: Task) :Promise<any>{
    try {
        const respone = await apiInstance.post('/addTask', task);
        return respone;
    } catch (error) {
        throw(error)
    }
}

export async function getTasks(id: string) :Promise<any>{
    try {
        const respone = await apiInstance.get(`/listTask?id=${id}`);
        return respone;
    } catch (error) {
        throw(error)
    }
}

export async function deleteTask(id: string){
    try {
        const respone = await apiInstance.get(`./removeTask?id=${id}`);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}