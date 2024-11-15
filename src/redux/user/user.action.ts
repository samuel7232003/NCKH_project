import { ThunkAction } from "redux-thunk";
import userSlice from "./user.slice";
import { RootState } from "../store";
import { AnyAction } from "@reduxjs/toolkit";
import { User } from "./user.state";
import { editAccount, getAccount } from "../../service/accountService";

export const userActions = userSlice.actions;

export const getUser = (id: string):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        const response :User = await getAccount(id);
        dispatch(userActions.setUser(response));
    }
}

export const editUser = (user: User):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) => {
        dispatch(userActions.setUser({...user}));
        const res: User = await editAccount(user);
    }
}

export const setUserConnectList = (users : User[]):ThunkAction<void, RootState, unknown, AnyAction> => {
    return async(dispatch, getState) =>{
        dispatch(userActions.setUserConnectList([...users]));
    }
}

export const setOnlineUsers = (list : string[]):ThunkAction<void, RootState, unknown, AnyAction> =>{
    return async(dispatch, getState) => {
        dispatch(userActions.setOnlineUsers([...list]));
    }
}