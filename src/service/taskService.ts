import { Task } from "../redux/task/task.state";
import { apiInstance } from "./api";

export async function addTask(task: Task) {
    try {
        const respone = await apiInstance.post('/addTask', task);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}

export async function getTasks(id: string) {
    try {
        const respone = await apiInstance.get(`./listTask/${id}`);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}

export async function deleteTask(id: string){
    try {
        const respone = await apiInstance.get(`./removeTask/${id}`);
        return respone.data;
    } catch (error) {
        throw(error)
    }
}