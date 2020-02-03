import React, {useState, useEffect} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status } from '../Models/Status';
import { getUser } from '../DB'


// interface StoryProps extends RouteComponentProps {
//   user_id: string
// }

const Story: React.FC<RouteComponentProps> = (props) => {

  const [user_id, setUser_id] = useState<string>('');
  const [userStatuses, setUserStatuses] = useState<Status[]>([]);


  useEffect(() => {
    const fetchUserStatuses = async () => {
      const fetchUserId = await setUser_id(props?.match?.params.user_id);
      console.log('working', getUser(user_id)?.getStatuses());
      setUserStatuses(getUser(user_id)?.getStatuses())
    };
    fetchUserStatuses();
    console.log('user_id: ', user_id);
    console.log('user_statuses: ', userStatuses);

  }, [props,user_id]);


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