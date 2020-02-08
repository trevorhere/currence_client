import React, {useState, useEffect, useContext} from 'react';
import {withRouter, RouteComponentProps} from "react-router";
import { Status } from '../Models';
import { loadStatuses, follow, unFollow, isFollowing} from '../Services/Story';
import { authContext } from "../Context/authContext";


// authenticated user = routeUser ID: edit profile
// authenticated user & != routeUserID: folllow/unfollow
// no authenticated user: display story of route user ID

const Story: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  
  const { authenticatedUserID } = useContext(authContext);
  const [userStatuses, setUserStatuses] = useState<Status[] | undefined>([]);
  const [storyOwnerID, setStoryOwnerID] = useState<string>('');
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);


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
        follow(authenticatedUserID, storyOwnerID);
        setIsAFollower(true);
        }
        }>
        follow
      </button>
      </div>
  }



  useEffect(() => {
    setStoryOwnerID(props.match.params.userID!);
    setIsAFollower(isFollowing(authenticatedUserID, storyOwnerID))

    const loadUserStatuses = async () => {
      await loadStatuses(storyOwnerID, setUserStatuses);
    };

    loadUserStatuses();

  },[props,storyOwnerID,authenticatedUserID, userStatuses]);


  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
      <button onClick={() => props.history.push('/story/idB')}>B's story</button>
      {( authenticatedUserID) 
      ? 
      <div>

        {(authenticatedUserID == storyOwnerID) 
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

    <div>
      <h2>Story: {storyOwnerID }</h2>
        { userStatuses?.map(status => {
        return( <p>status: {status.message}</p> )
        })}
        </div>   

    </div>
  );
}

export default withRouter(Story);