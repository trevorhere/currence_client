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

import { signout, getCurrentUser } from '../Services/User';

// const reRoute = (props) => {
//   props.history.push("/signin");
//   console.log(getCurrentUser);
// }

const Index: React.FC<RouteComponentProps> = (props) => {
  
  const [user, setUser] = useState<User| null>(null);
  
  useEffect(() => {
    setUser(getCurrentUser());
    console.log('current user: ', user);
  }, [user])


  return ( 
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">


      <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white  text-2xl">
        <p className="py-10 text-4xl">
          Twitter Clone HomePage
        </p>

      <div className="container flex justify-between mx-auto">

        {user? 
          <div className="container flex justify-between mx-auto">
          <button onClick={signout}>signout</button>
          <button onClick={() => {
            console.log(getCurrentUser());
            }}>getCurrentUser</button>
          </div> 
        : 
          <div className="container flex justify-between mx-auto">
              <Link to="/Signup">Signup</Link>
              <Link to="/Signin">Signin</Link>
              <button onClick={() => {
                console.log(getCurrentUser());
                }}>getCurrentUser</button>
          </div>
        }

        </div>
      </header>
    </div>
  );
}

export default Index;