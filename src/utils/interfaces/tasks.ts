


export interface task {
    id: number;
    name: string;
    created_at: Date;
    user_id: number;
    is_completed: boolean;
    updated_at: Date | null;
}

export interface createTask {
    name: string;
    user_id: number;
}
export interface responseTaskOfUser {
    success: boolean;
    code: number;
    message: string;
    data: [task];
}

export interface responseDeleteTask {
    code: number;
    success: string;
    message: string;
    data: task;
}

export interface updateTask {
    task_id: number;
    name: string;
    is_completed: boolean;
}

export interface responseUpdatedTask extends responseDeleteTask{

}

