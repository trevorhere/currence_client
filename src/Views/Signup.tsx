import React, {useState} from 'react';
import { signup, getCurrentUser } from '../Services/User';
import { RouteComponentProps } from 'react-router-dom';

const Signup: React.FC<RouteComponentProps> = (props) => {


  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');  


  return ( getCurrentUser?  props.history.push("/") : 
    <div className="bg-gray-900 min-h-screen  flex flex-col items-center justify-center text-white text-2xl">
      <form className="bg-white shadow-md w-1/4 rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-black py-6 font-bold"> Twitter Clone</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            type="text" 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="******************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            onClick={() => signup(email, password)}
            >
              Sign Up
          </button>
          <button 
            className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            onClick={() =>  props.history.push("/signin")}
            >
              Sign In
          </button>
        </div>
      </form>
  </div>
  );
}

export default Signup;