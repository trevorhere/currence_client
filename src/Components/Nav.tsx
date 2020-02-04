import React from 'react';
// import logo from '../Assets/logo.svg';
import {  RouteComponentProps, withRouter } from 'react-router-dom';
// import Feed from './Feed';
// import Story from './Story';
// import Followers from './Followers';
// import Following from './Following';

import { signout } from '../Services/User';

interface INavProps extends RouteComponentProps {
    userID: string;
    history: any;
}

const Nav: React.FC<INavProps> = (props: INavProps) => {
  return ( 
    <div>
      {(props.userID)? 
        <div className="m-auto antialiased font-sans font-serif font-mono text-center">
            <div className="container flex justify-between mx-auto">
                <button onClick={() => props.history.push(`/feed/${props.userID}`)}>Feed</button>
                <button onClick={() => props.history.push(`/story/${props.userID}`)}>Story</button>
                <button onClick={() => props.history.push(`/followers/${props.userID}`)}>Followers</button>
                <button onClick={() => props.history.push(`/following/${props.userID}`)}>Following</button>
                <button onClick={() => signout()}>Signout</button>

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

export default withRouter(Nav);