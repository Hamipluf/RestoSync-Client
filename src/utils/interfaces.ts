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
    role: number
    photos: [string] | null
    tasks: [string],

}
export interface responseLogin {
    success: boolean,
    code: number,
    message: string,
    data: {
        userResponse: user,
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
export interface note {
    id: number,
    title: string,
    description: string,
    created_at: Date,
    is_completed: boolean,
    contacts: [number] | null,
    comments: [number] | null,
    owner_id: number,
    name: string,
    last_name: string,
    email: string,
    username: string | null,
    role: number
    photos: [string] | null
}
export interface notes {
    code: number,
    message: string,
    success: boolean,
    data: [note]
}
export interface dataNote {
    title: string,
    description?: string,
    owner_id: string | null,
}