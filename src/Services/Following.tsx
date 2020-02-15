import { getUser } from '../API'
import * as util from 'util' // has no default export

export const  buildFollowing = ( userID:string | null) => {
    if(userID){
        let currUser = getUser(userID);
        console.log('followees: \n', util.inspect(currUser?.getFollowing()));

        if(!currUser)
            return null;

        let followers = currUser.getFollowing();
        return [...followers];

    } else return null;
}

export const unfollow = (userID:string, followingID: string) => {
    console.log('unfollow');
    const user = getUser(userID);
    const following = getUser(followingID);
    user!.removeFollowing(following!)
}