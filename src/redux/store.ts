import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./user/user.slice";
import { diarySlice } from "./diary/diary.slice";
import { taskSlice } from "./task/task.slice";

export const store = configureStore({
    reducer: {
        user:userSlice.reducer,
        diary:diarySlice.reducer,
        task:taskSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch