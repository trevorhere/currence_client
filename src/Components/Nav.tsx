import React, {useState, useEffect} from 'react';
// import logo from '../Assets/logo.svg';
import {  RouteComponentProps} from 'react-router-dom';
// import Feed from './Feed';
// import Story from './Story';
// import Followers from './Followers';
// import Following from './Following';
import { User } from '../Models/User';

import { signout, getCurrentUserID } from '../Services/User';


const reRoute = (props):void =>{
    props?.history?.push("/signin")
}

interface NavProps {
    userID: string
}

const Nav: React.FC<NavProps> = (props: NavProps) => {
  
  const [userID, setUserID] = useState< string | null>(null);
  
  useEffect(() => {
    setUserID(props.userID);
    console.log('current user: ', userID);
  }, [userID])


  return ( 
    <div>
      {(!userID)? <>{userID}</> : <>null</> }
      <div className="m-auto antialiased font-sans font-serif font-mono text-center">

      <div className="container flex justify-between mx-auto">
          {/* <Feed/>
          <Link to={`/story/${user?.id}`}>Story</Link>
          <Followers/>
          <Following/> */}
          {/* <Link to="/Signup">Signup</Link>
          <Link to="/Signin">Signin</Link> */}
          <button onClick={signout}>signout</button>
          <button onClick={() => {
            console.log(getCurrentUserID());
          }}>getCurrentUser</button>
      </div>
      </div>
    </div>

  );
}

export default Nav;