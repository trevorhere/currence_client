import React, { useContext, useState, useEffect} from 'react';
import { authContext } from '../Context/authContext';
import { RouteComponentProps } from 'react-router-dom';
import { buildFeed } from '../Services/Feed'
import {Status } from '../Models'

const Feed: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { authenticatedUserID } = useContext(authContext);

  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [feed, setFeed] = useState< Status[] | null  >(null);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  
    
  const addStatus = (status: Status): void   => {
    console.log('status', status);
    // userStatuses!.push(status);
    // if(userStatuses){
    //   setUserStatuses([...userStatuses])
    // }
  }


  function renderFeed(){
      if(feed != null){
        return feed.map(status => {
          return (
            <h2 key={status.id}>owner: {status.user_id} message: {status.message}</h2>
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
      {( authenticatedUserID && authenticatedUserID == props.match.params.userID) 
      ? 
      <div>
        <h2>Feed For Authenticated User: {authenticatedUserID} </h2>
        {renderFeed()}
        <label className="block text-gray-700 text-xsm py-4 font-bold mb-2">
              New Status
            </label>
            <input 
              className="shadow appearance-none border rounded w-1/4 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="status" 
              type="text" 
              placeholder="status"
              onChange={(e) => setNewStatusMessage(e.target.value)}
            />
            <button 
              className="hover:bg-blue-700 border text-blue-500 font-bold my-3 py-3 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button"
              onClick={() =>  addStatus(new Status(authenticatedUserID!, newStatusMessage!))}
              >
                Submit
            </button>
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