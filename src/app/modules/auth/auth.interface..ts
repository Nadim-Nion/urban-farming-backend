export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER' | 'VENDOR';
};


export type TUserRole2 =  'ADMIN' | 'CUSTOMER' | 'VENDOR';