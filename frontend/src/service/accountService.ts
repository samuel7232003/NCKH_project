import { User } from "../redux/user/user.state";
import { apiInstance } from "./api";

export interface accountLogin {
    email: string;
    password: string;
}

export async function login(email: string, password: string):Promise<any> {
    try{
        const data = {
            email: email,
            password: password
        };
        const respone = await apiInstance.post("/login", data);
        return respone;
    } catch (error) {
        throw error;
    }
}

export async function signup(user:User) :Promise<any>{
    try{
        const respone = await apiInstance.post("/signup", user);
        return respone;
    } catch (error){
        throw(error);
    }
}

export async function getProfileService() :Promise<any>{
    try{
        const res = await apiInstance.get('/profile');
        return res;
    } catch(error){
        throw(error);
    }
}

export async function getAccount(id: string, email: string):Promise<any> {
    try{
        const respone:User|null = await apiInstance.get(`/account?id=${id}&email=${email}`);
        return respone;
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

export async function getAllUser():Promise<any> {
    try {
        const respone = await apiInstance.get("/getAllUser");
        return respone;
    } catch (error) {
        
    }
}