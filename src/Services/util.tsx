import { getUser } from '../API'

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
    const user = getUser(userID);
    return (user?.getFollowee(followeeID) !== undefined);
}