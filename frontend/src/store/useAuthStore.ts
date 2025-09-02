import {create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import type { AuthStore, AxiosError,SignupData,loginData } from '../types/types';
import toast from 'react-hot-toast';


export const useAuthStore = create<AuthStore>((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
     logout: async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null})
            toast.success("Logged out successfully")
        } catch (error:AxiosError | any) {
            toast.error(error!.response.data?.message || "Failed to logout");
        }
    },
    login : async (loginData:loginData)=>{
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", loginData);
            set({authUser: res.data})
            toast.success("Logged in successfully")
        } catch (error:AxiosError | any) {
            toast.error(error.response?.data?.message || "Failed to login");
        } finally{
            set({isLoggingIn: false})
        }
    },

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
        set({isSigningUp: true})

        try {
          const res =await axiosInstance.post("/auth/signup", data);
          set({authUser: res.data})
            toast.success("Account created successfully");
        } catch (error:AxiosError | any) {
            toast.error(error!.response.data?.message || "Failed to create account");
            
        }
       
    },

   
}))