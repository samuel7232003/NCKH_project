import { ThunkAction } from "redux-thunk";
import userSlice from "./user.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { User } from "./user.state";

export const userActions = userSlice.actions;

export const getListUser = ():ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        // const response:User[] = await fetch('https://localhost:3000')
        // dispatch(userActions.setUserList(response))
    }
}