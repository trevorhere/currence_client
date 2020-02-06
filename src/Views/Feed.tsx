import React, { useContext, useState, useEffect} from 'react';
import { authContext } from '../Context/authContext';
import { RouteComponentProps } from 'react-router-dom';
import { buildFeed } from '../Services/Feed'
import {Status } from '../Models'

const Feed: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { authenticatedUserID } = useContext(authContext);

  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [feed, setFeed] = useState< Status[] | null  >(null);


  function renderFeed(){
      if(feed != null){
        return feed.map(status => {
          return (
            <h2>owner: {status.user_id} message: {status.message}</h2>
          )})
        } else {
          return <p>feed not found</p>
        }
    }
  
  useEffect(() => {
    setCurrUserID(props.match.params.userID)
    const latestFeed =  buildFeed(currUserID);
    setFeed(latestFeed);
  }, [props.match.params.userID, currUserID])


  return (

    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      { (authenticatedUserID && authenticatedUserID == props.match.params.userID) 
      ? 
      <div>
        <h2>Feed For Authenticated User: {authenticatedUserID} </h2>
        {renderFeed()}
      </div>
      : 
      <div>
        <h2> No User Found</h2>
      </div>
      }
    </div>

  );
}

export default Feed;