import React, {useState, useEffect} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status } from '../Models';
import { loadStatuses, setViewUpdater, saveStatus, setViewFetcher } from '../Services/Story';


// interface StoryProps extends RouteComponentProps {
//   user_id: string
// }

const Story: React.FC<RouteComponentProps> = (props) => {
  // const [user, setUser] = useState<User>('');

  const [user_id, setUser_id] = useState<string>('');
  const [userStatuses, setUserStatuses] = useState<Status[]>([]);
  const [newStatusMessage, setNewStatusMessage] = useState<string>('');
  
  
  const addStatus = (status: Status): void   => {
    console.log('status', status);
    userStatuses.push(status);
    console.log([...userStatuses]);

    setUserStatuses([...userStatuses])
  }

  useEffect(() => {
    setUser_id(props?.match?.params.user_id);

    const loadUserStatuses = async () => {
      await loadStatuses(user_id, setUserStatuses);
    };

    loadUserStatuses();

    setViewUpdater(() => {return setUserStatuses});
    setViewFetcher(() => {return userStatuses});

  },[props,user_id, userStatuses]);


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <h2>Story: {user_id }</h2>
      <div>
        { userStatuses?.map(status => {
        return( <p>status: {status.message}</p> )
        })}
        </div>
        <label className="block text-gray-700 text-sm py-4 font-bold mb-2">
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
              onClick={() =>  addStatus(new Status( user_id, newStatusMessage))}
              >
                Submit
            </button>
    </div>
  );
}

export default withRouter(Story);