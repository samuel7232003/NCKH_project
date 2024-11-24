import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useCallback } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const appDispatchWithoutPayloadBuilder = (actions: ActionCreatorWithoutPayload) => {
    return () => {
        const dispatch = useAppDispatch()
        return useCallback(() => dispatch(actions()),[dispatch])
    }
}

export const appDispatchWithHigherPayloadBuilder = <T>(actions: ActionCreatorWithPayload<T>) =>{
    return (payload: T) => {
        const dispatch = useAppDispatch()
        return useCallback(() => dispatch(actions(payload)), [dispatch, payload])
    }
}