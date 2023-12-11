export interface note {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    is_completed: boolean;
    contacts: [number] | null;
    comments: [number] | null;
    owner_id: number;
    name: string;
    last_name: string;
    email: string;
    username: string | null;
    role: number;
    photos: [string] | null;
}
export interface notes {
    code: number;
    message: string;
    success: boolean;
    data: [dataNote];
}
export interface dataNote {
    id: number;
    title: string;
    description: string;
    owner_id?: number | null;
    is_completed?: boolean;
    created_at?: Date;
}
export interface dataAddNote {
    task_id: number;
    title: string;
    description: string;
    owner_id: number;
}
export interface dataUpdateNote extends Omit<dataAddNote, 'task_id' | 'owner_id'> {
    is_completed: boolean
    nid: number,
}
export interface noteAded extends dataAddNote {
    id: number;
    created_at: Date;
    is_completed: boolean;
}
export interface responseAddNote {
    success: boolean;
    code: number;
    message: string;
    data: noteAded;
}
export interface noteByTaskId {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    task_name: string;
    is_completed: boolean;
    task_id: number;
    owner_id: number
}
export interface responseGetNoteByTaskId {
    success: boolean;
    code: number;
    message: string;
    data: [noteByTaskId];
}