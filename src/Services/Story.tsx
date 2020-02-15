import { getUser } from '../API'
import { User, Status } from '../Models';
import moment from 'moment';



export const fetchUser = ( userID: string): User | null => {
    return getUser(userID);
} 

export const loadStatuses = ( userID:string): Status[] | null => {
    const user = getUser(userID);
    if(user){
        return [...user!.getStatuses()].sort((b, a) => moment(a.created_at).diff(b.created_at));
    }
    return null;
} 


// export const saveStatus = (status: string, userID: string): void => {
//     const newStatus = new Status(userID, status);

//     fetchUser(userID)?.addStatus(newStatus);
//     let currViewArr = viewFetcher();
//     viewUpdater(currViewArr);
//     console.log(status) d;
// }

export const follow = (userID: string, followeeID: string): void => {
    const user = getUser(userID);
    const followee = getUser(followeeID);

    user?.addFollowing(followee!);
    followee?.addFollower(user!);
}

export const unFollow = (userID: string, followeeID: string): void => {
    const user = getUser(userID);
    const followee = getUser(followeeID);

    user!.removeFollowing(followee!);
    followee!.removeFollower(user!);
}

export const isFollowing = (userID: string, followeeID: string): boolean => {
    console.log('userID', userID);
    console.log('fID', followeeID);
    const user = getUser(userID);

    console.log('returning: ',user?.getFollowee(followeeID) !== undefined )
    return (user?.getFollowee(followeeID) !== undefined);
}