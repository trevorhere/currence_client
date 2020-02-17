import React, {useState, useEffect, useContext} from 'react';
import { RouteComponentProps} from "react-router";
import { follow, unFollow, isFollowing} from '../../Services/Story';
import { authContext } from "../../Context/authContext";
import { getUser } from '../../API'
import { User } from '../../Models';


interface IProfileBox extends RouteComponentProps {
  storyOwnerID: string,
  authenticatedUserID: string,
}





const ProfileBox: React.FC<IProfileBox> = (props: IProfileBox) => {
  const { authenticatedUserID } = useContext(authContext);
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);
  const [storyUser, setStoryUser] = useState<User|null>(null);


  useEffect(() => {
    setIsAFollower(isFollowing(props.authenticatedUserID!, props.storyOwnerID));
    setStoryUser(getUser(props.storyOwnerID));
  },[props]);


  const renderFollowActionButton = () => {
    return (isAFollower) ?
      <div>
      <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() => {
          unFollow(props.authenticatedUserID!, props.storyOwnerID);
          setIsAFollower(false);
        }}
      >
        unfollow
      </button>
      </div>
      :
      <div>
      <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() => {
        follow(props.authenticatedUserID!, props.storyOwnerID);
        setIsAFollower(true);
        }
        }>
        follow
      </button>
      </div>
  }


    return (
      <div className="flex text-left justify-center py-20 ">
        <div className="p-2">
          <img  className="rounded-full h-32 w-32" alt="profile" src={storyUser?.getPicture()!} />
        </div>
        <div className="flex flex-col my-auto h-100 text-left align-middle align-middle p-4">
          <div className="text-lg text-left underline pt-2">{props.storyOwnerID}</div>
          <div className="text-sm font-extrabold text-blue-500">Followers: {storyUser?.getFollowers().length!}</div>
          <div className="text-sm font-extrabold text-blue-500">Following: {storyUser?.getFollowing().length!}</div>
          <div>
            {(authenticatedUserID && authenticatedUserID !== props.storyOwnerID)? renderFollowActionButton(): <div></div>}
            </div>
        </div>
      </div>
    )
}

export default ProfileBox;