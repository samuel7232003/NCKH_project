import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserListModel } from "./user.state";

const initialUserState:UserListModel = {
    user: {
        id: '',
        email: '',
        password: '',
        name:''
    },
    userList: []
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload;
        },
        setUserList(state, action: PayloadAction<User[]>){
            state.userList = action.payload;
        }
    }
})

export default userSlice;