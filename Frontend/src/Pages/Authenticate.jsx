import { useState } from "react";
import {useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [signIn, setSignIn] = useState(true);
  const [name,setName] = useState("");
  const [gender,setGender] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("inside signup");
    e.preventDefault();
    setError("");

     if (!email || !password || (!signIn && (!name || !gender))) {
    setError("Please fill in all fields");
    return;
  }
    
    const response = await fetch(
    signIn?  "http://localhost:3000/api/users/signIn"
            :"http://localhost:3000/api/users/signUp"
    ,{
        method:'POST',
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(
          signIn?{email,password}:{email,password,name,gender}
        )
      });
      const data = await response.json();

      if(!response.ok){
        setError(data.message);
        return;
      }

      localStorage.setItem("token",data.token);
      navigate("/profile");


  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center p-3">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-5 sm:p-6">
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {signIn ?  "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {signIn ? "Sign in to your account":"Sign up to account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!signIn && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input 
              type="text"
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
              placeholder="Enter your name"
              />
              
            </div>
          )}
          {!signIn && (
            <div className="mb-4">
              <label htmlFor="gender" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Gender
              </label>
              <select 
              type="text"
              id="gender" 
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
              
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
              
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 pr-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-2 text-xs sm:text-sm text-gray-600">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-xs sm:text-sm text-black hover:text-gray-700 font-medium text-left sm:text-right"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2.5 text-sm sm:text-base rounded-lg transition duration-200 cursor-pointer"
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs sm:text-base mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => {
              setSignIn(!signIn);
            }}
            className="text-black hover:text-gray-700 font-medium cursor-pointer"
          >
            {signIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
