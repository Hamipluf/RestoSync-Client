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