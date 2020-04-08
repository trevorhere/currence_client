import React, { useContext, useState, useEffect} from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { User } from '../Models'
import { authContext } from "../Context/authContext";
import { follow, unFollow, isFollowing } from '../Services/Followers';
import FollowersService from '../Services/Followers';



const Followers: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [followers, setFollowers] = useState< any[] | null  >(null);
  const [ isLoading, setIsLoading ] = useState(false)
  const { authenticationToken, setAuthenticationToken } = useContext(authContext);
  const { alias, token } = authenticationToken!;
  const [ followersService, setFollowersService] = useState<FollowersService>( new FollowersService(setAuthenticationToken))
  
  useEffect(() => {
    followersService.getFollowers(alias, token).then(followers => {
      setFollowers(followers!);
    });
    
  }, [ alias, token, followersService ])


  const handleUnfollow = ( followeeAlias: string ) => {
    unFollow(alias!, followeeAlias, token).then(res => {
      followersService.getFollowers(alias!, token!).then(res => {
        setFollowers(res);
      })
    })
  }

  const handleFollow = (followeeAlias:string) => {
    follow(alias!, followeeAlias, token).then(res => {
      followersService.getFollowers(alias!, token!).then(res => {
        setFollowers(res);
      })
    })
  }
  const renderFollowActionButton = ( followeeAlias: string) => {
    return (isFollowing(alias!, followeeAlias, token!));
  }

  // const isFollowingVal = async () => { await isFollowing(alias!, followeeAlias, token).then(res => {
  //       if(res){
  //         console.log(true);
  //         return '1'
  //     } else {
  //       console.log(false);
  //         return '2'       
  //       }
  //     })
  //   }
  //   console.log(  isFollowingVal());
  //   console.log('end');
  // }

  
  const renderFollowers = () => {
    if(followers != null){
      if(!followers.length)
        return <p>User has no followers!</p>

      return followers.map((follow, i) => {
        console.log('follow: ', follow)
        return (
          <div key={i} className="flex border-b-2  border-gray-600 items-center justify-between py-4">
            <div className="flex flex-row">
              <div>
                <img className="w-10 h-10 rounded-full mr-4"  src={follow.followerPicture} alt="Avatar of Jonathan Reinink"/>
              </div>
              <div className="text-sm">
                <Link 
                  to={`/story/${follow.followerAlias}`}
                  className="leading-none text-blue-500 hover:underline"
                  >{follow.followerAlias}</Link>
                  <p className="text-gray-600">Aug 18</p>
              </div>
          </div> 
        {/* { renderFollowActionButton(user.alias!)} */}
          </div>
        )})
      } else {
        return <p>Loading</p>
      }
  }
  
  return (
      <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
        <div className=" w-1/4 ">
        {renderFollowers()}
        </div>
      </div>
  )
}

export default Followers;