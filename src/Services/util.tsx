import ServerFacade from '../API/ServerFacade'
import { User } from '../Models'

export const follow =  async (userID: string, followeeID: string): Promise<void> => {
    return await ServerFacade.follow(userID, followeeID);
}

export const unFollow = async (userID: string, followeeID: string):  Promise<void> => {
    return await ServerFacade.unFollow(userID, followeeID);
}

export const isFollowing = async (userID: string, followeeID: string): Promise<boolean> => {
    return await ServerFacade.isFollowing(userID, followeeID)
}

export const getUser = async (userID: string): Promise<User | null> => {
    return await ServerFacade.getUser(userID);
}