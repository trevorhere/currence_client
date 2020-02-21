import React, { useContext, useState, useEffect} from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { User } from '../Models'
import { authContext } from "../Context/authContext";
import { follow, unFollow, isFollowing, buildFollowers} from '../Services/Followers';




const Followers: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const [currUserID, setCurrUserID] = useState<string| null>(null);
  const [followers, setFollowers] = useState< User[] | null  >(null);

  const [ isLoading, setIsLoading ] = useState(false)
  const { authenticatedUserID } = useContext(authContext);
  
  useEffect(() => {
    setCurrUserID(props.match.params.userID);
    buildFollowers(currUserID!).then(res => {
      setFollowers(res!);
    });
    
  }, [props.match.params.userID, currUserID])


  const handleUnfollow = ( followeeID:string) => {
    unFollow(currUserID!, followeeID).then(res => {
      // buildFollowers(currUserID!).then(res => {
      //   setFollowers(res);
      // })
    })
  }

  const handleFollow = (followeeID:string) => {
    follow(currUserID!, followeeID).then(res => {
      // buildFollowers(currUserID!).then(res => {
      //   setFollowers(res);
      // })
    })
  }

  const renderFollowActionButton = ( followeeID: string) => {
    // console.log('isFollowing' ,  isFollowing(currUserID!, followeeID))
    // return (isFollowing(currUserID!, followeeID)) ?

   const isFollowingVal = async () => { await isFollowing(currUserID!, followeeID).then(res => {
       if(res){
         console.log(true);
         return '1'
       } else {
        console.log(false);
         return '2'       
        }
     })
    }
    console.log( isFollowingVal());
    console.log('end');



     

    //  return <div>test</div>
    // return isFollowing(currUserID!, followeeID).then(res => {

    //   const button = (res) ? 
    //    ( <div>
    //       <button 
    //         className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 
    //         type="button"
    //         onClick={() => {
    //           handleUnfollow(followeeID);
    //         }}
    //       >
    //         unfollow
    //       </button>
    //     </div>)
    //     :
    //    ( <div>
    //       <button 
    //         className="hover:bg-blue-700 border text-sm text-blue-500 py-1 px-2  rounded focus:outline-none focus:shadow-outline" 
    //         type="button"
    //         onClick={() => {
    //           handleFollow(followeeID);
    //         }}>
    //         follow
    //       </button>
    //     </div>)

    //     setIsLoading(false);
    //     return button
    //   });

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
        { renderFollowActionButton(user.getID()!)}
          </div>
        )})
      } else {
        return <p>followers not found</p>
      }
  }
    


  return (
      <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
        <div className=" w-1/4 ">
        {renderFollowers()}
        </div>
      </div>
  )

  // return (
  //   <div className="flex pt-32 flex-col items-center content-center justify-center  text-white text-xl">
  //       <div className=" w-1/4 ">
  //       {renderFollowers()}
  //       </div>
  //   </div>

  // );
}

export default Followers;