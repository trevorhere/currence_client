import React, {useState, useEffect} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status, User } from '../Models';
import { getUser } from '../DB'
import { loadStatuses } from '../Services/Story';


// interface StoryProps extends RouteComponentProps {
//   user_id: string
// }

const Story: React.FC<RouteComponentProps> = (props) => {

  // const [user, setUser] = useState<User>('');

  const [user_id, setUser_id] = useState<string>('');
  const [userStatuses, setUserStatuses] = useState<Status[]>([]);


  useEffect(() => {
    setUser_id(props?.match?.params.user_id);

    const loadUserStatuses = async () => {
      await loadStatuses(user_id, setUserStatuses);
    };

    loadUserStatuses();

  },[props,user_id, userStatuses]);


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <h2>Story: {user_id }</h2>
      <div>
        { userStatuses?.map(status => {
        return( <p>status: {status.message}</p> )
        })}
        </div>
    </div>
  );
}

export default withRouter(Story);