import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export default class FollowersService {

    setAuth;
    cursor;


    constructor( setAuth){
        this.setAuth = setAuth;
        this.cursor = "none";
    }

    getFollowers = async ( alias: string, token: string): Promise< any | null> => {
        
        if(this.cursor === "end"){
            return null;
        }

        let res = await ServerFacade.getFollowers(alias, token, this.cursor, this.setAuth);
        
        if(res?.key){
            this.cursor = res?.key?.followerAlias
        } else {
            this.cursor = "end"
        }

        console.log('resres: ', res);
        if(res){
            return res!.followers;
        } else {
            return null;
        }
    }
}

export { follow, unFollow, isFollowing }