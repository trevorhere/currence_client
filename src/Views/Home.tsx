import React, {useState, useEffect} from 'react';
import logo from '../Assets/logo.svg';
import { BrowserRouter as Router, Route, Link, RouteComponentProps} from 'react-router-dom';
import Feed from './Feed';
import Story from './Story';
import Followers from './Followers';
import Following from './Following';
import { User } from '../Models/User';

import { signout, getCurrentUser } from '../Services/User';

// const reRoute = (props) => {
//   props.history.push("/signin");
//   console.log(getCurrentUser);
// }

const Home: React.FC<RouteComponentProps> = (props) => {

  const [user, setUser] = useState<User| null>(null);
  
  useEffect(() => {
    setUser(getCurrentUser());
    console.log('current user: ', user);
  }, [user])


  return ( 
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">

    <div className="container flex justify-between mx-auto">
        <Feed/>
        <Story/>
        <Followers/>
        <Following/>
        <Link to="/Signup">Signup</Link>
        <Link to="/Signin">Signin</Link>
        <button onClick={signout}>signout</button>
        <button onClick={() => {
          console.log(getCurrentUser());
        }}>getCurrentUser</button>
    </div>

      <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HUZZAH, this is your home page!!!!
        </p>
      </header>
    </div>
  );
}

export default Home;