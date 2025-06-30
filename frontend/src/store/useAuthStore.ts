import {create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import type { AuthStore } from '../types/types';
import type { SignupData } from '../types/types';

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