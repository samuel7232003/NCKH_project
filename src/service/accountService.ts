import { User } from "../redux/user/user.state";
import { apiInstance, handleError } from "./api";

export interface accountLogin {
    email: string;
    password: string;
}

interface loginRes {
    token: string,
    email: string
}

export async function login(email: string, password: string):Promise<loginRes> {
    try{
        const data = {
            email: email,
            password: password
        };
        const respone = await apiInstance.post<loginRes>("/login", data);
        return respone.data;
    } catch (error) {
        throw error;
    }
}

export async function signup(user:User) {
    try{
        const respone = await apiInstance.post("/signup", user);
        return respone.data;
    } catch (error){
        throw(error);
    }
}

export async function getAccount(id: string) {
    try{
        const respone = await apiInstance.get(`/account/${id}`);
        return respone.data;
    } catch (error){
        throw(error);
    }
}

export async function editAccount(user:User) {
    try{
        const respone = await apiInstance.post("/editAccount", user);
        return respone.data;
    } catch (error){
        throw(error)
    }
}