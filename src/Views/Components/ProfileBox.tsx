import React, {useState, useEffect, useContext} from 'react';
import { RouteComponentProps} from "react-router";
import { follow, unFollow, isFollowing, getUser} from '../../Services/util';
import { User } from '../../Models';
import { authContext } from '../../Context/authContext';

interface IProfileBox extends RouteComponentProps {
  ownerAlias: string,
  owner: User
}

const ProfileBox: React.FC<IProfileBox> = (props: IProfileBox) => {
  const [isAFollower, setIsAFollower] = useState<boolean | null>(null);
  const [storyUser, setStoryUser] = useState<User|null>(null);
  // const [followers, setFollowers] = useState<number|null>(null);
  // const [following, setFollowing] = useState<number |null>(null);
  const { authenticationToken } = useContext(authContext);

  const alias = authenticationToken?.alias ? authenticationToken?.alias : null;
  const token = authenticationToken?.token ? authenticationToken?.token : null;

  // const refetchNumbers = () => {
  //   getUser(props.ownerAlias!).then(user => {
  //     setFollowers(user?.followers.length!);
  //     setFollowing(user?.following.length!);
  //   })
  // }

  useEffect(() => {
    isFollowing(alias!, props.ownerAlias, token!).then(res => {
      setIsAFollower(res);
      console.log('is a follower: ', res)
    })

    getUser(props.ownerAlias!).then(user => {
      setStoryUser(user);
      // setFollowers(user?.followers.length!);
      // setFollowing(user?.following.length!);
    })
  },[alias, props.ownerAlias, token]);


  const renderFollowActionButton = () => {
    return (isAFollower) ?
      <div>
      <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() => {
          unFollow(alias!, props.ownerAlias, token!).then(res => {
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
        follow(alias!, props.ownerAlias, token!).then(res => {
          setIsAFollower(true);
          // refetchNumbers();
        })

        }}>
        follow
      </button>
      </div>
  }

    return (
      (alias) 
      ? (
        <div className="flex text-left justify-center py-20 ">
        <div className="p-2">
          <img  className="rounded-full h-32 w-32" alt="profile" src={storyUser?.picture!} />
        </div>
        <div className="flex flex-col my-auto h-100 text-left align-middle align-middle p-4">
          <div className="text-lg text-left underline pt-2">{props.owner?.alias}</div>
          {/* <div className="text-sm font-extrabold text-blue-500">Followers: {followers}</div>
          <div className="text-sm font-extrabold text-blue-500">Following: {following}</div> */}
          <div>
            {(alias && alias !== props.ownerAlias)? renderFollowActionButton(): <div></div>}
            </div>
        </div>
      </div>
      ) 
      : (
        <div className="flex text-left justify-center py-20 ">
        <div className="p-2">
          <img  className="rounded-full h-32 w-32" alt="profile" src={props.owner?.picture!} />
        </div>
        <div className="flex flex-col my-auto h-100 text-left align-middle align-middle p-4">
          <div className="text-lg text-left underline pt-2">{props.ownerAlias}</div>
          {/* <div className="text-sm font-extrabold text-blue-500">Followers: {followers}</div>
          <div className="text-sm font-extrabold text-blue-500">Following: {following}</div> */}
        </div>
      </div>
      )

    )
}

export default ProfileBox;
