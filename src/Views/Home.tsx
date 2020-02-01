import React from 'react';
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

const Home: React.FC<RouteComponentProps> = (props) => {
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