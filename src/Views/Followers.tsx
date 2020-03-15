import React, { useContext, useState, useEffect} from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { User } from '../Models'
import { authContext } from "../Context/authContext";
import { follow, unFollow, isFollowing, buildFollowers} from '../Services/Followers';


const Followers: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [followers, setFollowers] = useState< User[] | null  >(null);

  const [ isLoading, setIsLoading ] = useState(false)
  const { authenticationToken } = useContext(authContext);

  const { alias, token } = authenticationToken!;
  
  useEffect(() => {
    buildFollowers(alias, token).then(followers => {
      setFollowers(followers!);
    });
    
  }, [ alias, token ])


  const handleUnfollow = ( followeeAlias: string ) => {
    unFollow(alias!, followeeAlias, token).then(res => {
      // buildFollowers(alias!).then(res => {
      //   setFollowers(res);
      // })
    })
  }

  const handleFollow = (followeeAlias:string) => {
    follow(alias!, followeeAlias, token).then(res => {
      // buildFollowers(alias!).then(res => {
      //   setFollowers(res);
      // })
    })
  }

  const renderFollowActionButton = ( followeeAlias: string) => {
    // console.log('isFollowing' ,  isFollowing(alias!, followeeID))
    // return (isFollowing(alias!, followeeID)) ?

  const isFollowingVal = async () => { await isFollowing(alias!, followeeAlias).then(res => {
        if(res){
          console.log(true);
          return '1'
      } else {
        console.log(false);
          return '2'       
        }
      })
    }
    console.log(  isFollowingVal());
    console.log('end');
  }

  
  const renderFollowers = () => {
    if(followers != null){
      return followers.map((user, i) => {
        return (
          <div key={i} className="flex border-b-2  border-gray-600 items-center justify-between py-4">
            <div className="flex flex-row">
              <div>
                <img className="w-10 h-10 rounded-full mr-4"  src={user.picture} alt="Avatar of Jonathan Reinink"/>
              </div>
              <div className="text-sm">
                <Link 
                  to={`/story/${user.alias}`}
                  className="leading-none text-blue-500 hover:underline"
                  >{user.alias}</Link>
                  <p className="text-gray-600">Aug 18</p>
              </div>
          </div> 
        { renderFollowActionButton(user.alias!)}
          </div>
        )})
      } else {
        return <p>Followers not found</p>
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