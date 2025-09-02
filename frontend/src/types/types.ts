export type AuthImagePatternTypes = {
    title:String,
    subtitle:String 
}

export interface AuthStore {
  authUser: null | object; // assuming authUser is an object
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data:SignupData) => Promise<void>;
  logout: () => Promise<void>;
  login: (loginData:loginData) => Promise<void>;
  
}


 export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export interface loginData {
email: string;
password: string;
}

export interface AxiosError extends Error {
    response: any;
}