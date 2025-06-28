import {create } from 'zustand';
import { axiosInstance } from '../lib/axios';

interface AuthStore {
  authUser: null | object; // assuming authUser is an object
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data:SignupData) => Promise<boolean>;
}
interface SignupData {
  fullName: string;
  email: string;
  password: string;
}
export const useAuthStore = create<AuthStore>((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            
            console.log("Error checking auth:", error);
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data:SignupData)=>{
        return false
    }
}))