import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
          e.preventDefault();
          const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
          if(response.data.success)
          {
            setToken(response.data.token)
          }
          else {
            toast.error(response.data.message)
          }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
            <form
                onSubmit={onSubmitHandler}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-8 sm:w-[24rem] w-[90%] flex flex-col items-center gap-6"
            >
                <div className="inline-flex flex-col items-center gap-2 mb-4">
                    <h1 className="text-2xl font-semibold tracking-wide">
                        Admin Panel
                    </h1>
                    <div className="w-10 h-[2px] bg-gray-700"></div>
                </div>

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="Email"
                    required
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
                    placeholder="Password"
                    required
                />

                <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-red-500 text-white rounded-md text-sm font-medium tracking-wide shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;
