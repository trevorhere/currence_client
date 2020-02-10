import React, { useContext, useState, useEffect} from 'react';
import { authContext } from '../Context/authContext';
import { Link } from 'react-router-dom';
import { buildFeed, createStatus } from '../Services/Feed'
import {Status } from '../Models'
import moment from 'moment';


const Feed: React.FC = () => {
  const { authenticatedUserID } = useContext(authContext);
  const [feed, setFeed] = useState< Status[] | null  >(null);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  
    
  const addStatus = (): void   => {
    createStatus(authenticatedUserID!, newStatusMessage);
    setNewStatusMessage('');
    setFeed(buildFeed(authenticatedUserID!))
  }


  const renderFeed = () => {
      if(feed != null){
        return feed.map(status => {
          return (
            <div className="flex border-b-2 border-gray-600  px-2 py-2 items-stretch mb-5 lg:w-1/4 sm:w-1/2  text-sm">
            <img 
              alt="meaningful text" 
              src="https://pbs.twimg.com/profile_images/887661330832003072/Zp6rA_e2_400x400.jpg" 
              className="w-10 h-10 rounded mr-3" />
            <div className="flex-1 overflow-hidden">
                <div>
                <span className="font-bold"> <Link to={`/story/${status.user_alias}`}>{status.user_alias}</Link></span>
                    <span className="text-grey text-xs">{moment(status.created_at).format(' MMM DD')}</span>
                </div>
                <h2 key={status.id} className="text-white leading-normal">
                    {status.message}
                </h2>
            </div>
        </div>
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
        <h2 className="text-left font-bold"> Home </h2>
        <div className=" lg:w-1/4 sm:w-1/2 px-2 py-2   flex-row border-b-2 border-gray-600">
            <input 
              className="shadow appearance-none border rounded  py-3 px-3 mx-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="status" 
              value={newStatusMessage}
              type="text" 
              placeholder="status"
              onChange={(e) => setNewStatusMessage(e.target.value)}
            />
            <button 
              className=" hover:bg-blue-700 border text-blue-500 font-bold my-3 py-3 px-4 rounded focus:outline-none focus:shadow-outline" 
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