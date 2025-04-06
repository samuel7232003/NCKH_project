import { Diary } from "../redux/diary/diary.state";
import { apiInstance } from "./api";

export async function getDiarys(id: string) :Promise<any>{
    try{
        const respone = await apiInstance.get(`/listDiary?id=${id}`);
        return respone;
    } catch (error){
        console.log(error);
    }
}

export async function addDiary(diary: Diary) {
    try{
        const respone = await apiInstance.post('/addDiary', diary);
        return respone;
    } catch (error){
        console.log(error);
    }
}

export async function removeDiary(idUser: string, date: string):Promise<any> {
    try{
        const data = {idUser: idUser, date: date};
        const respone = await apiInstance.post('/removeDiary', data);
        return respone;
    } catch (error){
        console.log(error);
    }
}