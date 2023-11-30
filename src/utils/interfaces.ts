export interface dataLogin {
  email: string;
  password: string;
}
export interface dataRegister extends dataLogin {
  name: string;
  last_name: string;
  username: string;
  role: 1 | 2 | 3;
}
export interface user {
  id: number;
  name: string;
  last_name: string;
  email: string;
  username: string | null;
  role: 1 | 2 | 3;
  photos: [string] | null;
}
export interface responseLogin {
  success: boolean;
  code: number;
  message: string;
  data: {
    userResponse: user;
    token: string;
  };
}
export interface responseRegister extends responseLogin { }
export interface responseCurrent {
  success: boolean;
  code: number;
  message: string;
  data: user;
}
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

export interface noteAded {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  is_completed: boolean;
  owner_id: number;
  task_id: number;
}
export interface responseAddNote {
  success: boolean;
  code: number;
  message: string;
  data: noteAded;
}
export interface noteByTaskId {
  note_id: number;
  title: string;
  description: string;
  note_created_at: Date;
  task_name: string;
  task_id: number;
}
export interface responseGetNoteByTaskId {
  success: boolean;
  code: number;
  message: string;
  data: [noteByTaskId];
}
export interface store {
  id: number;
  name: string;
  company_name: string;
  address: string;
  cuit: `${number}-${number}-${number}`
  owner_id: number;
}

export interface dataStore {
  name: string;
  company_name: string;
  address: string;
  cuit: `${number}-${number}-${number}`
  owner_id: number | string | null;
}
export interface updateStore {
  name?: string;
  company_name?: string;
  address?: string;
  cuit?: `${number}-${number}-${number}`
  owner_id?: number | string | null;
  sid: number
}
export interface responseStoresOwner {
  success: boolean;
  code: number;
  message: string;
  data: store;
}

export interface responseCreateStore {
  success: boolean;
  code: number;
  message: string;
  data: store;
}

export interface dataAddEmployee {
  role: 'Camarero' | 'Barista' | 'Encargado' | 'Cajero' | 'Cocina'
  name: string,
  store_id: number,
  disponibility?: [string]
}
export interface dataUpdateEmployee extends Omit<dataAddEmployee, 'store_id'> {
  eid: number
}

export interface employee {
  id: number
  role: 'Camarero' | 'Barista' | 'Encargado' | 'Cajero' | 'Cocina'
  name: string,
  store_id: number,
  disponibility?: [string]
}

export interface responseAssignEmploye {
  success: boolean;
  code: number;
  message: string;
  data: employee;
}

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

export interface product {
  id: number;
  title: string;
  description: string;
  price: string | number;
  stock_quantity: number;
  category: string;
  store_id: number;
}
export interface updateProduct {
  pid?: number;
  title?: string;
  description?: string;
  price?: string | number;
  stock_quantity?: number;
  category?: string;
  store_id?: number;
}



export interface responseGetAllProduct {
  code: number;
  success: string;
  message: string;
  data: [product];
}

export interface addProduct {
  title: string;
  description?: string;
  stock_quantity: number;
  category: string;
  price: number | string;
}

export interface responseAddProduct {
  code: number;
  success: boolean;
  message: string;
  data: product;
}

export interface allEmployeeStore {
  code: number;
  success: boolean;
  message: string,
  data: [employee]
}

