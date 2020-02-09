import React, { useContext, useState, useEffect} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { authContext } from '../Context/authContext';
import {Status, User } from '../Models'

import  { buildFollowers } from '../Services/Followers'




const Followers: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const { authenticatedUserID } = useContext(authContext);
  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [followers, setFollowers] = useState< User[] | null  >(null);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');

  useEffect(() => {
    setCurrUserID(props.match.params.userID)
    const latestFollowers =  buildFollowers(currUserID);
    setFollowers(latestFollowers);
  }, [props.match.params.userID, currUserID])


  
  const renderFollowers = () => {
    if(followers != null){
      return followers.map(user => {
        return (
          <h2 key={user.id}> email: {user.email} </h2>
        )})
      } else {
        return <p>followers not found</p>
      }
  }
    


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <h2>Followers</h2>
      {renderFollowers()}
    </div>

  );
}

export default Followers;