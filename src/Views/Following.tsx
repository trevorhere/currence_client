import React, { useContext, useState, useEffect} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { authContext } from '../Context/authContext';
import {Status, User } from '../Models'

import  { buildFollowing } from '../Services/Following'




const Following: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const { authenticatedUserID } = useContext(authContext);
  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [Following, setFollowing] = useState< User[] | null  >(null);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');

  useEffect(() => {
    setCurrUserID(props.match.params.userID)
    const latestFollowing =  buildFollowing(currUserID);
    setFollowing(latestFollowing);
  }, [props.match.params.userID, currUserID])


  
  const renderFollowing = () => {
    if(Following != null){
      return Following.map(user => {
        return (
          <h2 key={user.id}> email: {user.email} </h2>
        )})
      } else {
        return <p>Following not found</p>
      }
  }
    


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <h2>Following</h2>
      {renderFollowing()}
    </div>

  );
}

export default Following;