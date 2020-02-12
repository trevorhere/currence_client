import React, { useState, useEffect} from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { User } from '../Models'

import  { buildFollowers } from '../Services/Followers'




const Followers: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [followers, setFollowers] = useState< User[] | null  >(null);

  useEffect(() => {
    setCurrUserID(props.match.params.userID)
    const latestFollowers =  buildFollowers(currUserID);
    setFollowers(latestFollowers);
  }, [props.match.params.userID, currUserID])


  
  const renderFollowers = () => {
    if(followers != null){
      return followers.map((user, i) => {
        return (

          <div className="flex border-b-2 w-1/2 border-gray-600 items-center py-4">
          <img className="w-10 h-10 rounded-full mr-4"  src={user.picture} alt="Avatar of Jonathan Reinink"/>
          <div className="text-sm">
          <Link 
            to={`/story/${user.alias}`}
            className="leading-none text-blue-500 hover:underline"
            >{user.alias}</Link>
            <p className="text-gray-600">Aug 18</p>
          </div>
          </div>
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