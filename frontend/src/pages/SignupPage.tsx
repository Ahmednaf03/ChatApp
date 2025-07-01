import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, User2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const {signup,isSigningUp} = useAuthStore()

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full Name is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!formData.password.trim()) return toast.error("Password is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters long")
    return true 
    }
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const isValid = validateForm()
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      
      <div className="flex flex-col justify-center items-center p-6 sm:p-12  ">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div 
            className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">

        <MessageSquare className="size-6 text-primary"/>
            </div>
            <h1 className="text-2xl font-bold mt-2">Create an Account</h1>
            <p className="text-base-content/60">Get started free with your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 mt-8 ">
             <div className="flex flex-col gap-2">
              <label className="label" htmlFor="FullName">
                <span className="label-text font-medium ">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40 " />
                </div>
                <input
                  type="text"
                  id='FullName'
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="Email">
                <span className="label-text font-medium ">Email</span>
              </label>
              <div className="relative">
                <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40 " />
                </div>
                <input
                  type="email"
                  id='Email'
                  className="input input-bordered w-full pl-10"
                  placeholder="z0M0j@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="label" htmlFor="Password">
                <span className="label-text font-medium ">Password</span>
              </label>
              <div className="relative">
                <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40 " />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id='Password'
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-10"
                onClick={()=>{setShowPassword(!showPassword)}}>
                  {
                    showPassword ?(
                      <Eye className="size-5 text-base-content/40"/>
                    ):(
                      <EyeOff className="size-5 text-base-content/40"/>
                    )
                  }
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-1" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                <Loader2 className="size-5 animate-spin"/>
                Loading...
                </>
              ):("Create Account")}

            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-base-content/60">
            Already have an account?{" "} 
            <Link to="/login" className="text-primary hover:underline">Login</Link></p>
          </div>
        </div>
      </div>
      </div>
      
      <AuthImagePattern
      title="Join our community"
      subtitle="Start your journey with us today"/>
    </div>
  )
}

export default SignupPage