import React, {useState, useEffect, useContext} from 'react';
import { RouteComponentProps} from "react-router";
import { follow, unFollow, isFollowing, getUser} from '../../Services/util';
import { authContext } from "../../Context/authContext";
import { User } from '../../Models';


interface IProfileBox extends RouteComponentProps {
  storyOwnerID: string,
  alias: string
}

const ProfileBox: React.FC<IProfileBox> = (props: IProfileBox) => {



  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);
  const [storyUser, setStoryUser] = useState<User|null>(null);
  const [followers, setFollowers] = useState<number|null>(null);
  const [following, setFollowing] = useState<number |null>(null);
  const { authenticationToken } = useContext(authContext);

  const { alias, token } = authenticationToken!


  const refetchNumbers = () => {
    setFollowers(storyUser?.followers.length!);
    setFollowing(storyUser?.following.length!);
  }

  useEffect(() => {
    isFollowing(props.alias!, props.storyOwnerID).then(res => {
      setIsAFollower(res);
    })

    getUser(props.storyOwnerID!).then(user => {
      setStoryUser(user);
      setFollowers(user?.followers.length!);
      setFollowing(user?.following.length!);
    })
  },[props]);


  const renderFollowActionButton = () => {
    return (isAFollower) ?
      <div>
      <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() => {
          unFollow(props.alias!, props.storyOwnerID).then(res => {
          refetchNumbers();
          setIsAFollower(false);
          })
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
        follow(alias, props.storyOwnerID, token).then(res => {
          setIsAFollower(true);
          refetchNumbers();
        })

        }}>
        follow
      </button>
      </div>
  }

    return (
      <div className="flex text-left justify-center py-20 ">
        <div className="p-2">
          <img  className="rounded-full h-32 w-32" alt="profile" src={storyUser?.picture!} />
        </div>
        <div className="flex flex-col my-auto h-100 text-left align-middle align-middle p-4">
          <div className="text-lg text-left underline pt-2">{props.storyOwnerID}</div>
          <div className="text-sm font-extrabold text-blue-500">Followers: {followers}</div>
          <div className="text-sm font-extrabold text-blue-500">Following: {following}</div>
          <div>
            {(props.alias && props.alias !== props.storyOwnerID)? renderFollowActionButton(): <div></div>}
            </div>
        </div>
      </div>
    )
}

export default ProfileBox;