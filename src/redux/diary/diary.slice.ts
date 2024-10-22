import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary, DiaryModel, ListDiary } from "./diary.state";

const initalDiaryState:DiaryModel = {
    diary: {
        id: '',
        idUser: '',
        date: '',
        survey: 0,
        message: ''
    },
    listDiary: {
        idUser: '',
        diarys: []
    }
}

export const diarySlice = createSlice({
    name: 'diary',
    initialState: initalDiaryState,
    reducers:{
        setDiary(state, action: PayloadAction<Diary>){
            state.diary = action.payload;
        },
        setListDiary(state, action: PayloadAction<ListDiary>){
            state.listDiary = action.payload;
        }
    }
})