import { getUser } from '../API'
import  { Status } from '../Models'
import moment from 'moment';


export const  buildFeed = ( userID: string | null, statusCount: number) :Status[] | null => {

    if(userID){
        let currUser = getUser(userID);
        // console.log('followers: \n', util.inspect(currUser?.getFollowers()));

        if(!currUser)
            return null;

        let statuses = [...currUser.getStatuses()];
        let feed = [...currUser.getFeed()];

        if(statuses.length > 0){
            statuses.map(status => {
                feed.push(status);
            });
        };

        return feed.sort((b, a) => moment(a.created_at).diff(b.created_at)).slice(0, statusCount);
    } else return null;
}

export const createStatus = (userID:string, message: string):void => {
    const user = getUser(userID);
    const newStatus = new Status(userID, user!.alias, message);
    user?.addStatus(newStatus);
}