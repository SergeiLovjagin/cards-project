import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
});

export const API = {
    async login(email: string, password: string, rememberMe: boolean) {
        return await instance.post<ProfileType>(`/auth/login`, {email: email, password: password, rememberMe: rememberMe}, {})
    }
}

//RESPONSE TYPES
export type ProfileType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: false
    __v: number
    _id: string
}
