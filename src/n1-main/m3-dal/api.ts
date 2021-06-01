import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
});

export const API = {
    async login(email: string, password: string, rememberMe: boolean) {
        return await instance.post<ProfileType>(`auth/login`, {email: email, password: password, rememberMe: rememberMe}, {})
    },
    async registration(email: string, password: string) {
        return await instance.post('auth/register', {email : email, password : password})
    },
    async authMe(){
        return await instance.post('auth/me')
    },
    async forgot(email: string){
        return await instance.post('/auth/forgot', {email: email, from: "test-front-admin <litvincevi@mail.ru>",
            message: `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`}, {})
    },
    async newPassword(password: string, resetPasswordToken: string) {
        return await instance.post('/auth/set-new-password', {password: password, resetPasswordToken: resetPasswordToken})
    },
    async logOut() {
        return await instance.delete('auth/me')
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
