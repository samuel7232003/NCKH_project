import { ThunkAction } from "redux-thunk";
import { diarySlice, initalDiaryState } from "./diary.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { Diary, ListDiary } from "./diary.state";
import { getDiarys } from "../../service/diaryService";

export const diaryAction = diarySlice.actions;

export const getListDiary = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    function compareDates(a:Diary, b:Diary){
        return (new Date(a.date)).getTime() - (new Date(b.date)).getTime();
    }
    return async(dispatch, getState) => {
        const respone:Diary[] = await getDiarys(id);
        const data:ListDiary = {idUser: id, diarys: respone};
        const sortData:ListDiary = {...data, diarys: data.diarys.sort(compareDates)};
        dispatch(diaryAction.setListDiary(sortData));
    }
}

export const setDiary = (dia: Diary|null):ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch, getState) => {
        if(dia) dispatch(diaryAction.setDiary(dia));
        else dispatch(diaryAction.setDiary(initalDiaryState.diary));
    }
}