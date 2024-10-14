import { User } from "../redux/user/user.state";
import { apiInstance, handleError } from "./api";

interface accountLogin {
    email: string;
    password: string;
}

interface loginRes {
    token: String,
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