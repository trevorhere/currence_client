import ServerFacade from '../API/ServerFacade'
import { User } from '../Models'

export const follow =  async (userID: string, followeeID: string, token: string ): Promise<User | null> => {
    return await ServerFacade.follow(userID, followeeID, token);
}

export const unFollow = async (userID: string, followeeID: string, token: string ):  Promise<void> => {
    return await ServerFacade.unFollow(userID, followeeID, token);
}

export const isFollowing = async (userID: string, followeeAlias: string, token: string ): Promise<boolean> => {
    return await ServerFacade.isFollowing(userID, followeeAlias, token)
}

export const getUser = async (userID: string): Promise<User | null> => {
    return await ServerFacade.getUser(userID);
}