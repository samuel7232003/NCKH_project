import { ThunkAction } from "redux-thunk";
import userSlice from "./user.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";

export const userActions = userSlice.actions;

export const getUser = (id: number):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        
    }
}