import React, { useContext, useState, useEffect} from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { User } from '../Models'
import { authContext } from "../Context/authContext";

import  { buildFollowing, unfollow } from '../Services/Following'


const Following: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [Following, setFollowing] = useState< User[] | null  >(null);
  const { authenticatedUserID } = useContext(authContext);


  useEffect(() => {
    setCurrUserID(props.match.params.userID)
    const latestFollowing =  buildFollowing(currUserID);
    setFollowing(latestFollowing);
  }, [props.match.params.userID, currUserID])


  const handleUnfollow = ( followingID:string) => {
    unfollow(authenticatedUserID!, followingID);
    const latestFollowing =  buildFollowing(currUserID);
    setFollowing(latestFollowing);

  }

  
  const renderFollowing = () => {
    if(Following != null){
      return Following.map((user,i) => {
        return (
          <div className="flex border-b-2 w-1/2 border-gray-600 items-center justify-between py-4">
            <div className="flex flex-row">
              <div>
                <img className="w-10 h-10 rounded-full mr-4"  src={user.picture} alt="Avatar of Jonathan Reinink"/>
              </div>
              <div className="text-sm">
              <Link 
                to={`/story/${user.alias}`}
                className="leading-none text-blue-500 hover:underline"
                >{user.alias}</Link>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          <button 
              className="hover:bg-blue-700 border text-md text-blue-500  py-1 px-2 mx-10 rounded focus:outline-none focus:shadow-outline" 
              type="button"
              onClick={() =>  handleUnfollow(user.id)}
              >
                unfollow
            </button>
          </div>
        )})
      } else {
        return <p>Following not found</p>
      }
  }
    


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <h2 className="text-left font-bold my-4"> Following </h2>
      {renderFollowing()}
    </div>
  );
}

export default Following;