export interface dataLogin {
    email: string,
    password: string
}
export interface dataRegister extends dataLogin {
    name: string,
    last_name: string
    username: string,
    role: 'user' | 'admin' | 'premium'

}
export interface user {
    id: number,
    name: string,
    last_name: string,
    email: string,
    username: string | null,
    role: 'user' | 'admin' | 'premium'
    photos: [string] | null
    tasks: [string],

}
export interface responseLogin {
    success: boolean,
    code: number,
    message: string,
    data: {
        user: user,
        token: string
    }


}
export interface responseRegister extends responseLogin { }
export interface responseCurrent {
    success: boolean,
    code: number,
    message: string,
    data: user
}