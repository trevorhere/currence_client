import React, {useState, useEffect} from 'react';
import { User } from '../Models/User'

import logo from '../Assets/logo.svg';
import { BrowserRouter as Router, Route, Link, RouteComponentProps} from 'react-router-dom';
import Feed from './Feed';
import Story from './Story';
import Followers from './Followers';
import Following from './Following';
import Signup from './Signup';
import Signin from './Signin';

import { signout, getCurrentUserID } from '../Services/User';

// const reRoute = (props) => {
//   props.history.push("/signin");
//   console.log(getCurrentUserID);
// }

const Index: React.FC<RouteComponentProps> = (props) => {
  
  const [userID, setUserID] = useState< string | null>(null);
  
  useEffect(() => {
    setUserID(getCurrentUserID());
    console.log('current user: ', userID);
  }, [userID])


  return ( 
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">


      <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white  text-2xl">
        <p className="py-20 text-4xl">
          Welcome To TwitterClone
        </p>

      <div className="container flex justify-between mx-auto">

        {userID? 
          <div className="container flex justify-between mx-auto">
          <button onClick={signout}>signout</button>
          <button onClick={() => {
            console.log(getCurrentUserID());
            }}>getCurrentUserID</button>
          </div> 
        : 
          <div className="container flex justify-between mx-auto">
              <button 
                className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={() => {
                  props.history.push("/signup")
                }}>
                  Signup
              </button>
              <button 
                className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={() => {
                  props.history.push("/signin")
                }}>
                  Signin
              </button>
              <button 
                className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={() => {
                  console.log(getCurrentUserID());
                }}>getCurrentUserID
              </button>
          </div>
        }

        </div>
      </header>
    </div>
  );
}

export default Index;

