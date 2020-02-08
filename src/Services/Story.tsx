import { getUser } from '../DB'
import { User, Status } from '../Models';

let viewUpdater = (newarr: Status[] | void) => {};
let viewFetcher = () => {};

export const fetchUser = ( userID: string): User | null => {
    return getUser(userID);
} 

export const loadStatuses = ( userID:string , setUserStatuses:(statuses: Status[] | undefined ) => void): void => {
    let statusArr = getUser(userID)?.getStatuses();
    setUserStatuses(statusArr);
} 

export const setViewUpdater = ( updaterFunction: () => void ): void => {
    viewUpdater = updaterFunction;
}

export const setViewFetcher = ( fetcherFunction: () => void ): void => {
    viewFetcher = fetcherFunction;
}


export const saveStatus = (status: string, userID: string): void => {
    const newStatus = new Status(userID, status);

    fetchUser(userID)?.addStatus(newStatus);
    let currViewArr = viewFetcher();
    viewUpdater(currViewArr);
    console.log(status);
}

export const follow = (userID: string, followeeID: string): void => {
    const user = getUser(userID);
    const followee = getUser(followeeID);

    user?.addFollowing(followee!);
    followee?.addFollower(user!);

    console.log('following: ', user?.getFollowing());

}

export const unFollow = (userID: string, followeeID: string): void => {
    const user = getUser(userID);
    const followee = getUser(followeeID);

    user!.removeFollowing(followee!);
    followee!.removeFollower(user!);

    console.log('following: ', user?.getFollowing());
}

export const isFollowing = (userID: string, followeeID: string): boolean => {
    const user = getUser(userID);
    return (user?.getFollowee(followeeID) !== undefined);
}


    // const fetchUserStatuses = async () => {
    //     const fetchUserId = await setuserID(props?.match?.params.userID);
    //     console.log('working', getUser(userID)?.getStatuses());
    //     setUserStatuses(getUser(userID)?.getStatuses())
    //   }