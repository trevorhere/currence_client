import React, {useState, useEffect, useContext} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status, User } from '../Models';
import { loadStatuses, isFollowing} from '../Services/Story';
import { authContext } from "../Context/authContext";
import  StatusBox from "./Components/StatusBox"
import  ProfileBox  from './Components/ProfileBox'
import { getUser } from '../API'

const Story: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticatedUserID } = useContext(authContext);
  const [userStory, setUserStory] = useState<Status[] | null>(null);
  const [storyOwnerID, setStoryOwnerID] = useState<string>('');
  const [storyUser, setStoryUser] = useState<User|null>(null);
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);

  const renderStory = () => {
    if(userStory != null){
      return userStory.map(status => {
        return (
          StatusBox(status)
        )}
      )} 
      else {
        return <p>feed not found</p>
      }
  }

  useEffect(() => {
    setStoryOwnerID(props.match.params.userID!);
    setStoryUser(getUser(storyOwnerID));
    isFollowing(authenticatedUserID!, storyOwnerID).then(res => {
      setIsAFollower(res);
    })

  loadStatuses(storyOwnerID).then(res => {
      setUserStory(res)
    })

  },[props,storyOwnerID,authenticatedUserID]);

  return (
    <div>
    {!getUser(storyOwnerID)
    ? <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
        <p>User Not Found</p>
      </div>
    : <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
          <div className=" w-1/4 ">
          <div className=" w-full flex-row">
        {/* <div className=" lg:w-1/4 sm:w-1/2 px-2 py-2  flex-row border-b-2 border-gray-600"> */}
          <div>
            < ProfileBox  
            storyOwnerID = {storyOwnerID}
            authenticatedUserID = {authenticatedUserID!}
          /> 
        </div>
        </div>
      {renderStory()}
      </div>
    </div>
    }
  </div>
  );
}

export default withRouter(Story);