import React, {useState, useEffect, useContext} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status, User } from '../Models';
import { loadStatuses, isFollowing} from '../Services/Story';
import { authContext } from "../Context/authContext";
import  StatusBox from "./Components/StatusBox"
import  ProfileBox  from './Components/ProfileBox'
import { getUser } from '../Services/util'

const Story: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticationToken } = useContext(authContext);
  const [userStory, setUserStory] = useState<Status[] | null>(null);
  const [storyOwnerAlias, setStoryOwnerAlias] = useState<string>('');
  const [storyUser, setStoryUser] = useState<User|null>(null);
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);

  // const { alias } = authenticationToken!;

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
    console.log('alias: ',props.match.params.alias)
    setStoryOwnerAlias(props.match.params.alias!);
    // setStoryUser(getUser(storyOwnerAlias));
    // isFollowing(alias!, storyOwnerAlias).then(res => {
    //   setIsAFollower(res);
    // })

  loadStatuses(storyOwnerAlias).then(res => {
    console.log('stories: ', res);
      setUserStory(res)
    })

  },[props,storyOwnerAlias]);

  return (
    <div>
    {!userStory
    ? <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
        <p>User Not Found</p>
      </div>
    : 
    <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
          <div className=" w-1/4 ">
          <div className=" w-full flex-row">
        {/* <div className=" lg:w-1/4 sm:w-1/2 px-2 py-2  flex-row border-b-2 border-gray-600"> */}
          <div>
            < ProfileBox  
            storyOwnerAlias = {storyOwnerAlias}
            alias = {storyOwnerAlias!}
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