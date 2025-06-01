"use client"

import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext()

  const [state, setState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault()
      setIsLoading(true)

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      })

      if (data.success) {
        navigate("/")
        setUser(data.user)
        setShowUserLogin(false)
        toast.success(state === "login" ? "Welcome back!" : "Account created successfully!")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (event) => {
    try {
      event.preventDefault()
      setIsLoading(true)

      if (!forgotEmail) {
        toast.error("Please enter your email address")
        return
      }

      const { data } = await axios.post("/api/user/forgot-password", {
        email: forgotEmail,
      })

      if (data.success) {
        toast.success("Password reset link sent to your email!")
        setShowForgotPassword(false)
        setForgotEmail("")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (showForgotPassword) {
    return (
      <div
        onClick={() => setShowUserLogin(false)}
        className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
      >
        <form
          onSubmit={handleForgotPassword}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <div className="w-full text-center">
            <h2 className="text-2xl font-medium text-primary mb-2">Forgot Password</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="w-full">
            <p className="mb-2 font-medium">Email Address</p>
            <input
              onChange={(e) => setForgotEmail(e.target.value)}
              value={forgotEmail}
              placeholder="Enter your email"
              className="border border-gray-200 rounded w-full p-3 mt-1 outline-primary focus:border-primary transition-colors"
              type="email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="w-full text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="text-primary hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="mb-2 font-medium">Full Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              className="border border-gray-200 rounded w-full p-3 mt-1 outline-primary focus:border-primary transition-colors"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="mb-2 font-medium">Email Address</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-3 mt-1 outline-primary focus:border-primary transition-colors"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-2 font-medium">Password</p>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="border border-gray-200 rounded w-full p-3 mt-1 pr-10 outline-primary focus:border-primary transition-colors"
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {/* Forgot Password Link - Only show on login */}
        {state === "login" && (
          <div className="w-full text-right">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-primary hover:underline cursor-pointer text-sm"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {state === "register" ? (
          <p className="text-center w-full">
            Already have an account?
            <span onClick={() => setState("login")} className="text-primary cursor-pointer hover:underline ml-1">
              Sign in here
            </span>
          </p>
        ) : (
          <p className="text-center w-full">
            Don't have an account?
            <span onClick={() => setState("register")} className="text-primary cursor-pointer hover:underline ml-1">
              Create one here
            </span>
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? state === "register"
              ? "Creating Account..."
              : "Signing In..."
            : state === "register"
              ? "Create Account"
              : "Sign In"}
        </button>
      </form>
    </div>
  )
}

export default Login
