import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export default class FollowingService {

    setAuth;
    key;

    constructor( setAuth){
        this.setAuth = setAuth;
        this.key = "";
    }

    getFollowing = async ( alias: string, token: string): Promise< User[] | null> => {
        // return await ServerFacade.getFollowing(alias, token, this.setAuth);
        let res = await ServerFacade.getFollowing(alias, token, this.key, this.setAuth);
        this.key =  JSON.stringify(res?.key);
        console.log('resres: ', res);
        if(res){
            return res!.following;
        } else {
            return null;
        }
    }
}

export { follow, unFollow, isFollowing }