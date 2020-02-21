import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export const  buildFollowers = async ( userID:string): Promise< User[] | null> => {
    return await ServerFacade.buildFollowers(userID)
}

export { follow, unFollow, isFollowing }