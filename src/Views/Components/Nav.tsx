import React, { useContext } from 'react';
import {  RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { signout } from '../../Services/auth';


import { authContext } from "../../Context/authContext";

const handleSignout = (setUserIDCallback) => {
    signout();
    setUserIDCallback(null);
}



const Nav: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticatedUserID, setAuthenticatedUserID} = useContext(authContext);

  const navButton = (name:string, path:string) => {
    return (
        <button
        className={
            `inline-block text-sm px-6 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 
            ${props.location.pathname.includes(name) ? `bg-white text-blue-500` : `` }`}
        onClick={() => props.history.push(path)}>{name}</button>
    )
  }


  return ( 

  <nav className="fixed w-full flex items-center bg-gray-900 top-0 inset-x-0 z-100 h-16  justify-between  border-b-2 border-gray-600 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="font-semibold text-xl tracking-tight"><Link to="/home">Currence</Link></span>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">

        {(authenticatedUserID)? 
          <div className="antialiased font-sans font-serif font-mono text-center">
              <div className=" justify-between mx-auto">
                   {navButton("home", `/home/${authenticatedUserID}`)}
                   {navButton("story", `/story/${authenticatedUserID}`)}
                   {navButton("following", `/following/${authenticatedUserID}`)}
                   {navButton("followers", `/followers/${authenticatedUserID}`)}
                  <button
                    className="inline-block text-sm px-6 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
                    onClick={() => handleSignout(setAuthenticatedUserID)}>Signout</button>

                </div>
            </div>
          : 
          <div>
            <button 
              className="inline-block text-sm px-6 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
              onClick={() => props.history.push('/signin')}>Signin</button>
            <button 
              className="inline-block text-sm px-4 mx-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
              onClick={() => props.history.push('/signup')}>Signup</button>
          </div>
        }
      </div>

    </div>
  </nav>
  );
}




export default withRouter(Nav)