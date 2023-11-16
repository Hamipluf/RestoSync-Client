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
    role: 1 | 2 | 3,
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
    data: [dataNote]
}
export interface dataNote {
    title: string,
    description?: string,
    owner_id: string | null,
}

export interface store {
    id: number,
    name: string,
    company_name: string,
    address: string,
    cuit: string,
    owner_id: number,
}
export interface dataStore {
    name: string,
    company_name: string,
    address: string,
    cuit: string,
    owner_id: number | string | null,
}
export interface responseStoresOwner {
    success: boolean,
    code: number,
    message: string,
    data: [store]
}

export interface responseCreateStore {
    success: boolean,
    code: number,
    message: string,
    data: store
}

export interface dataAddEmployee {
    store_id: number,
    user_id: number
}

export interface responseAssignEmploye {
    success: boolean,
    code: number,
    message: string,
    data: dataAddEmployee
}

export interface task {
    id: number,
    name: string,
    created_at: Date,
    user_id: number,
    is_completed: boolean
}
export interface responseTaskOfUser {
    success: boolean,
    code: number,
    message: string,
    data: [task]
}
