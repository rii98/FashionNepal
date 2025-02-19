/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useShopStore from "../store/shopStore";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const { token, setToken } = useShopStore();
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(state==="Sign Up"){
        const response = await axios.post(`${url}/api/user/register`, {name,email,password})
        if(response.data.success){
          toast.success("User created successfully");
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }else{
          toast.error(response.data.message);
        }
        
      }else{
        const response = await axios.post(`${url}/api/user/login`, {email,password})
        if(response.data.success){
          toast.success("Logged in successfully");
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex  flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800  "
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl ">{state}</p>
        <hr className="border-none w-8 h-[1.7px] mt-2 bg-gray-800 " />
      </div>
      {state === "Sign Up" ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 px-3 border border-gray-800"
          type="text"
          placeholder="Username"
          required
        />
      ) : (
        ""
      )}
      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full py-2 px-3 border border-gray-800"
        type="email"
        placeholder="Email address"
        required
      />
      <input
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full py-2 px-3 border border-gray-800"
        type="password"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {state === "Login" ? (
          <p className="cursor-pointer">Forgot password?</p>
        ) : (
          ""
        )}
        {state === "Login" ? (
          <p onClick={() => setState("Sign Up")} className="cursor-pointer">
            Create Account
          </p>
        ) : (
          <p onClick={() => setState("Login")} className="cursor-pointer">
            Already have an account?&nbsp;Login
          </p>
        )}
      </div>
      <button
        type="submit"
        className="text-white bg-black px-8 py-2 font-light mt-4 cursor-pointer"
      >
        {" "}
        {state === "Sign Up" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
};

export default Login;
