import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export const  getFollowing = async ( alias: string, token: string ): Promise< User[] | null> => {
    return await ServerFacade.getFollowing(alias, token);
}

export { follow, unFollow, isFollowing }