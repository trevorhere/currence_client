import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export default class FollowingService {

    setAuth;

    constructor( setAuth){
        this.setAuth = setAuth;
    }

    getFollowing = async ( alias: string, token: string): Promise< User[] | null> => {
        return await ServerFacade.getFollowing(alias, token, this.setAuth);
    }
}

export { follow, unFollow, isFollowing }