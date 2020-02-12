import React, {useState, useEffect, useContext} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status } from '../Models';
import { loadStatuses, follow, unFollow, isFollowing} from '../Services/Story';
import { authContext } from "../Context/authContext";
import { cStatus } from "../Components"


// authenticated user = routeUser ID: edit profile
// authenticated user & != routeUserID: folllow/unfollow
// no authenticated user: display story of route user ID

const Story: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticatedUserID } = useContext(authContext);
  const [userStory, setUserStory] = useState<Status[] | null>(null);
  const [storyOwnerID, setStoryOwnerID] = useState<string>('');
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);


  const renderStory = () => {
    if(userStory != null){
      return userStory.map(status => {
        return (
          cStatus(status)
        )}
      )} 
      else {
        return <p>feed not found</p>
      }
  }

  const renderFollowActionButton = () => {
    return (isAFollower) ?
      <div>
      <button 
      className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      type="button"
      onClick={() => {
        unFollow(authenticatedUserID!, storyOwnerID);
        setIsAFollower(false);
      }}
      >
        unfollow
      </button>
      </div>
      :
      <div>
      <button 
      className="hover:bg-blue-700 border text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      type="button"
      onClick={() => {
        follow(authenticatedUserID!, storyOwnerID);
        setIsAFollower(true);
        }
        }>
        follow
      </button>
      </div>
  }

  useEffect(() => {
    setStoryOwnerID(props.match.params.userID!);
    setIsAFollower(isFollowing(authenticatedUserID!, storyOwnerID))

    const latestStory = loadStatuses(storyOwnerID);
    setUserStory(latestStory)

  },[props,storyOwnerID,authenticatedUserID]);


  return (

    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
    <h2 className="text-left font-bold"> Story </h2>
 
    <div className=" lg:w-1/4 sm:w-1/2 px-2 py-2   flex-row border-b-2 border-gray-600">
         {( authenticatedUserID) 
      ? 
      <div>
        {(authenticatedUserID === storyOwnerID) 
        ?
        <div>
            <button>edit profile </button>
        </div>
        :
        <div>
          {renderFollowActionButton()}
        </div>
      }
    </div>
      :
      <></>
    }
    </div>
    {renderStory()}
  </div>
  );
}

export default withRouter(Story);