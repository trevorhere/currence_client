import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export default class FollowersService {

    setAuth;
    key;

    constructor( setAuth){
        this.setAuth = setAuth;
        this.key = "";

    }

    getFollowers = async ( alias: string, token: string): Promise< any | null> => {

        let res = await ServerFacade.getFollowers(alias, token, this.key, this.setAuth);
        this.key =  JSON.stringify(res?.key);
        console.log('resres: ', res);
        if(res){
            return res!.followers;
        } else {
            return null;
        }
    }
}

export { follow, unFollow, isFollowing }