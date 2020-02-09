import React, { useContext, useState, useEffect} from 'react';
import { authContext } from '../Context/authContext';
import { buildFeed, createStatus } from '../Services/Feed'
import {Status } from '../Models'

const Feed: React.FC = () => {
  const { authenticatedUserID } = useContext(authContext);
  const [feed, setFeed] = useState< Status[] | null  >(null);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  
    
  const addStatus = (): void   => {
    createStatus(authenticatedUserID!, newStatusMessage);
    setFeed(buildFeed(authenticatedUserID!))
  }


  const renderFeed = () => {
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
    const latestFeed =  buildFeed(authenticatedUserID!);
    setFeed(latestFeed);
  }, [authenticatedUserID])


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
        <h2>Home </h2>
        <div className="flex-row">
            <input 
              className="shadow appearance-none border rounded  py-3 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="status" 
              type="text" 
              placeholder="status"
              onChange={(e) => setNewStatusMessage(e.target.value)}
            />
            <button 
              className="hover:bg-blue-700 border text-blue-500 font-bold my-3 py-3 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button"
              onClick={() =>  addStatus()}
              >
                Submit
            </button>
        </div>

        {renderFeed()}
      </div>
  );
}

export default Feed;