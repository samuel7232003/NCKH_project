import { ThunkAction } from "redux-thunk";
import { diarySlice } from "./diary.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { Diary, ListDiary } from "./diary.state";
import { getDiarys } from "../../service/diaryService";

export const diaryAction = diarySlice.actions;

export const getListDiary = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const respone :Diary[] = await getDiarys(id);
        const data:ListDiary = {idUser: id, diarys: respone}
        dispatch(diaryAction.setListDiary(data));
    }
}