import { getUser } from '../DB'
import  { User, Status} from '../Models'
import * as util from 'util' 

export const  buildFeed = ( userID:string | null) => {

    if(userID){

        let currUser = getUser(userID);
        // console.log('followers: \n', util.inspect(currUser?.getFollowers()));

        if(!currUser)
            return null;

        let followers = [...currUser.getFollowers()];
        let feed = [...currUser.getStatuses()];

        followers.map(follower => {
            follower.getStatuses().map(status => {
                feed.push(status);
            })
        });

        return feed;

    } else return null;
}

export const createStatus = (userID:string, message: string):void => {
   // console.log('userID; ', userID, ' message: ', message);
    const newStatus = new Status(userID, message);
    getUser(userID)?.addStatus(newStatus);
}