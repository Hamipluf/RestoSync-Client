export interface user {
  id: number;
  name: string;
  last_name: string;
  email: string;
  username: string | null;
  role: 1 | 2 | 3;
  photos: [string] | null;
}

export interface dataLogin {
  email: string;
  password: string;
}
export interface responseLogin {
  success: boolean;
  code: number;
  message: string;
  data: string
}
export interface dataRegister extends dataLogin {
  name: string;
  last_name: string;
  username: string;
  role: 1 | 2 | 3;
}
export interface responseRegister extends responseLogin { }

export interface responseCurrent {
  success: boolean;
  code: number;
  message: string;
  data: string | {
    user: user,
    token: string
  };
}