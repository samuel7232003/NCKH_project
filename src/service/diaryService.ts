import { Diary } from "../redux/diary/diary.state";
import { apiInstance } from "./api";

export async function getDiarys(id: string) {
    try{
        const respone = await apiInstance.get(`/listDiary/${id}`);
        return respone.data;
    } catch (error){
        throw(error);
    }
}

export async function addDiary(diary: Diary) {
    try{
        const respone = await apiInstance.post('/addDiary', diary);
        return respone.data;
    } catch (error){
        throw(error);
    }
}