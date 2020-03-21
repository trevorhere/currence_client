import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export default class FollowersService {

    setAuth;

    constructor( setAuth){
        this.setAuth = setAuth;
    }

    getFollowers = async ( alias: string, token: string): Promise< User[] | null> => {
        return await ServerFacade.getFollowers(alias, token, this.setAuth);
    }
}

export { follow, unFollow, isFollowing }