import React, {useState, useEffect} from 'react';
import logo from '../Assets/logo.svg';
import { Link, RouteComponentProps} from 'react-router-dom';
import Feed from './Feed';
import Story from './Story';
import Followers from './Followers';
import Following from './Following';
import { User } from '../Models/User';

import { signout, getCurrentUserID } from '../Services/User';


const reRoute = (props):void =>{
    props?.history?.push("/signin")
}

const Home: React.FC<RouteComponentProps> = (props) => {
  
  const [userID, setUserID] = useState< string | null>(null);
  
  useEffect(() => {
    setUserID(getCurrentUserID());
    console.log('current user: ', userID);
  }, [userID])


  return ( 
    <div>
      {(!userID)? reRoute(props) : <></> }
      <div className="m-auto antialiased font-sans font-serif font-mono text-center">

      <div className="container flex justify-between mx-auto">
          <Feed/>
          <Link to={`/story/${userID}`}>Story</Link>
          <Followers/>
          <Following/>
          <Link to="/Signup">Signup</Link>
          <Link to="/Signin">Signin</Link>
          <button onClick={signout}>signout</button>
          <button onClick={() => {
            console.log(getCurrentUserID());
          }}>getCurrentUser</button>
      </div>

        <header className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            HUZZAH, this is your home page!!!!
          </p>
        </header>
      </div>
    </div>

  );
}

export default Home;