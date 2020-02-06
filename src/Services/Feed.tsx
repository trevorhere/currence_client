import { getUser } from '../DB'
import { Status } from '../Models';
import * as util from 'util' // has no default export

export const  buildFeed = ( userID:string) => {

    let currUser = getUser(userID);
    console.log('followers: \n', util.inspect(currUser?.getFollowers()));


    if(!currUser){
        return null;
    }

    let followers = currUser.getFollowers();
    let feed: Status[] = [];

    followers.map(follower => {
        follower.getStatuses().map(status => {
            feed.push(status);
        })
    });

    console.log("feed: ", feed);


    return feed;
}