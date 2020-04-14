import React, { useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { User } from '../Models'
import { authContext } from "../Context/authContext";
import  { unFollow } from '../Services/Following'
import FollowingService from '../Services/Following';

const Following: React.FC = () => {

  const [following, setFollowing] = useState< any[] | null  >(null);
  const { authenticationToken, setAuthenticationToken } = useContext(authContext);
  const { alias, token } = authenticationToken!
  const [followingService, setFollowingService] = useState< FollowingService >(new FollowingService(setAuthenticationToken));
  const [ isLoading, setIsLoading ] = useState(false)

  const reBuildFollowing = () => {
    followingService.getFollowing(alias!, token).then(res => {
      setIsLoading(true);
      if(res){
        setFollowing([...following!].concat(res));
      } else {
        alert('all outta status updates')
      }
      setIsLoading(false);
    })
  }

  const handleUnfollow = ( followingAlias: string ) => {
    unFollow(alias!, followingAlias, token!).then(res => {
      followingService.getFollowing(alias!, token!).then(following => {
        setFollowing(following!);
      })
    } )
  }

  useEffect(() => {
    followingService.getFollowing(alias, token).then(following => {
      setFollowing(following!);
    })
  }, [alias, token, followingService])

  const renderFollowing = () => {
    if(following != null){

      if(!following.length)
        return <p>User isn't following anyone!</p>


      return following.map((follow,i) => {
        return (
          <div key={i} className="flex border-b-2 border-gray-600 items-center justify-between py-4">
            <div className="flex flex-row">
              <div>
                <img className="w-10 h-10 rounded-full mr-4"  src={follow.followeePicture} alt="Avatar of Jonathan Reinink"/>
              </div>
              <div className="text-sm">
              <Link 
                to={`/story/${follow.followeeAlias}`}
                className="leading-none text-blue-500 hover:underline"
                >{follow.followeeAlias}</Link>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          {/* <button 
              className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 

              type="button"
              onClick={() =>  handleUnfollow(follow.followeeAlias)}
              >
                unfollow
            </button> */}
          </div>
        )})
      } else {
        return <p>Loading</p>
      }
  }
    
  return (
    <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
    <div className=" w-1/4 ">
    {renderFollowing()}
    </div>
    <button 
        className="hover:bg-blue-700 border text-sm text-blue-500 py-1 my-5 px-2 mb-5  rounded focus:outline-none focus:shadow-outline" 
        type="button"
        onClick={() =>  { 
              reBuildFollowing();
            }} >
          more
      </button>
</div>
  );
}

export default Following;