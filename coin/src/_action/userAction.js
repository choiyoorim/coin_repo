import { LOGIN_USER, REGISTER_USER, AUTH_USER, GIT_USER } from "./types";
import {request} from '../utils/axios';

const USER_URL = "api/user";

export function registerUser(dataToSubmit){
    const data = request("post",USER_URL +"/register",dataToSubmit);
    return{
        type:REGISTER_USER,
        payload:data,
    };
}

export function loginUser(dataToSubmit){
    const data = request("post",USER_URL+"/login",dataToSubmit);
    return{
        type:LOGIN_USER,
        payload:data,
    };
}

export function authUser(){
    const data = request("get",USER_URL+"/auth");
    return{
        type:AUTH_USER,
        payload:data,
    }
}

export function gitUser(){
    const data = request("get",USER_URL+"/github");
    return{
        type: GIT_USER,
        payload: data,
    }
}