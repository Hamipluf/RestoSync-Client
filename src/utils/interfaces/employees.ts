
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
  
export interface allEmployeeStore {
    code: number;
    success: boolean;
    message: string,
    data: [employee]
  }
  
export interface responseAssignEmploye {
    success: boolean;
    code: number;
    message: string;
    data: employee;
  }