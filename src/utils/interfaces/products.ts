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