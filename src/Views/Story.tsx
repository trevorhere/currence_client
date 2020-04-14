import React, {useState, useEffect} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status, User } from '../Models';
import StoryService, { isFollowing } from '../Services/Story';
import { authContext } from "../Context/authContext";
import  StatusBox from "./Components/StatusBox"
import  ProfileBox  from './Components/ProfileBox'
import { getUser } from '../Services/util'

const Story: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const [userStory, setUserStory] = useState<Status[] | null>(null);
  const [storyOwnerAlias, setStoryOwnerAlias] = useState<string>('');
  const [storyService, setStoryService] = useState<StoryService>(new StoryService());
  const [storyUser, setStoryUser] = useState<User|null>(null);
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);


  // const { alias } = authenticationToken!;
  const reBuildStory = () => {
    storyService.getStory(storyOwnerAlias).then(res => {
      setLoading(true);
      if(res){
        setUserStory([...userStory!].concat(res));
      } else {
        alert('all outta status updates')
      }
      setLoading(false);
    })
  }

  const renderStory = () => {
    if(userStory != null){
      return userStory.map(status => {
        return (
          StatusBox(status)
        )}
      )} 
      else {
        return <p>Loading</p>
      }
  }

  useEffect(() => {
    setStoryOwnerAlias(props.match.params.alias!);
    storyService.getStory(storyOwnerAlias).then(res => {
      setLoading(true);
      setUserStory(res)
      setLoading(false);
    })

  },[props,storyOwnerAlias]);

  return (
    <div>

    { 
    loading 
    ? 
    <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
        <p>Loading</p>
      </div>
    : 
    <div>
      {console.log('loading: ', loading)}
    {!userStory
    ? <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
        <p>Loading</p>
      </div>
    : 
    <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
          <div className=" w-1/4 ">
          <div className=" w-full flex-row">
        {/* <div className=" lg:w-1/4 sm:w-1/2 px-2 py-2  flex-row border-b-2 border-gray-600"> */}
          <div>
            < ProfileBox  
            ownerAlias = {storyOwnerAlias}
          /> 
        </div>
        </div>
      {renderStory()}
      </div>
      <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2 mb-5  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() =>  { 
              reBuildStory();
            }} >
          more
      </button>
    </div>


    } 
  </div> }
  </div>

    
  );
}

export default withRouter(Story);