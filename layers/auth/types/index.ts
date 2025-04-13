export interface User {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string,
}

export interface LoginResponse {
    access_token: string,
    refresh_token: string,
}

export interface UserCreateInput {
    name: string,
    email: string,
    password: string,
    avatar: string,
}

 export interface LoginInput {
        email:string,
        password:string
    }
export interface LoginOptions {
    throw?:boolean,
    withToast?:boolean
}
