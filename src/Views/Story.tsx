import React, {useState, useEffect, useContext} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status } from '../Models';
import { loadStatuses, setViewUpdater, saveStatus, setViewFetcher } from '../Services/Story';
import { authContext } from "../Context/authContext";

const Story: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticatedUserID } = useContext(authContext);
  const [userStatuses, setUserStatuses] = useState<Status[] | undefined>([]);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  
  
  const addStatus = (status: Status): void   => {
    console.log('status', status);
    userStatuses!.push(status);
    if(userStatuses){
      setUserStatuses([...userStatuses])
    }
  }

  useEffect(() => {
    const loadUserStatuses = async () => {
      await loadStatuses(authenticatedUserID!, setUserStatuses);
    };

    loadUserStatuses();

  },[props,authenticatedUserID, userStatuses]);


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <h2>Story: {authenticatedUserID }</h2>
      <div>
        { userStatuses?.map(status => {
        return( <p>status: {status.message}</p> )
        })}
        </div>
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
  );
}

export default withRouter(Story);