import React, { useContext } from 'react';
import {  RouteComponentProps, withRouter } from 'react-router-dom';
import { signout } from '../Services/User';


import { authContext } from "../Context/authContext";



const handleSignout = (setUserIDCallback) => {
    signout();
    setUserIDCallback(null);
}

const Nav: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticatedUserID, setAuthenticatedUserID} = useContext(authContext);




  return ( 
    <div>
      {(authenticatedUserID)? 
        <div className="m-auto antialiased font-sans font-serif font-mono text-center">
            <div className="container flex justify-between mx-auto">
                <button onClick={() => props.history.push(`/feed/${authenticatedUserID}`)}>Feed</button>
                <button onClick={() => props.history.push(`/story`)}>Story</button>
                <button onClick={() => props.history.push(`/followers/${authenticatedUserID}`)}>Followers</button>
                <button onClick={() => props.history.push(`/following/${authenticatedUserID}`)}>Following</button>
                <button onClick={() => handleSignout(setAuthenticatedUserID)}>Signout</button>

            </div>
        </div>
      : 
      <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <div className="container flex justify-between mx-auto">
        <button onClick={() => props.history.push('/signin')}>Signin</button>
        <button onClick={() => props.history.push('/signup')}>Signup</button>
      </div>
      </div>
      }
    </div>

  );
}

export default withRouter(Nav)