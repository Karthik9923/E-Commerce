import React, { useContext, useState } from 'react';
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
import { toast } from 'react-toastify'
import { useEffect } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      if (currentState == 'Sign Up') {

        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  };


  useEffect(()=> {
    if(token) {
      navigate('/')
    }
  },[token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white border border-gray-300 rounded-lg shadow-md p-8 sm:w-[24rem] w-[90%] flex flex-col items-center gap-6"
      >
        {/* Title Section */}
        <div className="inline-flex flex-col items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold tracking-wide">
            {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <div className="w-10 h-[2px] bg-gray-700"></div>
        </div>

        {/* Conditional Input for Sign-Up */}
        {currentState === 'Sign Up' && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Full Name"
            required
          />
        )}

        {/* Common Inputs */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
          placeholder="Password"
          required
        />

        {/* Actions */}
        <div className="w-full flex justify-between text-xs text-gray-600">
          <p className="hover:text-red-500 cursor-pointer">Forgot Password?</p>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-red-500 text-white rounded-md text-sm font-medium tracking-wide shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
        >
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {/* Footer or Additional Info */}
      <div className="mt-6 text-xs text-gray-600">
        {currentState === 'Login' ? (
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => setCurrentState('Sign Up')}
              className="text-gray-900 underline cursor-pointer hover:text-red-500"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setCurrentState('Login')}
              className="text-gray-900 underline cursor-pointer hover:text-red-500"
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
