import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export const  buildFollowing = async ( userID:string): Promise< User[] | null> => {
    return await ServerFacade.buildFollowing(userID);
}

export { follow, unFollow, isFollowing }