import React, {useState, useContext} from 'react';
import { authContext } from '../Context/authContext';
import { signin } from '../Services/auth';
import {  RouteComponentProps, withRouter} from 'react-router-dom';

const reRoute = (props: RouteComponentProps, authenticatedUserID: string | null):void =>{
  props.history.push(`/home`)
}

const Signin: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const { authenticatedUserID, setAuthenticatedUserID } = useContext(authContext);
  const [alias, setAlias] = useState<string>('aliasA');
  const [password, setPassword] = useState<string>('passwordA');


  return ( 
    <div>
      {authenticatedUserID? reRoute(props, authenticatedUserID) : null }
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
        <form className="bg-white shadow-md  lg:w-1/4 sm:w-1/2 rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-black py-6 font-bold">Sign In</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Alias 
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="alias" 
              type="text" 
              placeholder="Alias"
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input 
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
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
              onClick={ async () => {
                const newUserID = await signin(alias, password);
                console.log(`setting userID: ${newUserID}`)
                if(setAuthenticatedUserID){
                  setAuthenticatedUserID(newUserID);
                }
              }}
            >
              Sign In
            </button>
            <button 
              className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button"
              onClick={() =>  props.history.push("/signup")}
              >
                Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default  withRouter(Signin);