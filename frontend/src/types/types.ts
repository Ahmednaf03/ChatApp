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
  signup: (data:SignupData) => Promise<boolean>;
}


 export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}