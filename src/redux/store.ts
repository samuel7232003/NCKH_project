import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./user/user.slice";
import { diarySlice } from "./diary/diary.slice";

export const store = configureStore({
    reducer: {
        user:userSlice.reducer,
        diary:diarySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch