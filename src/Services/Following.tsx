import  { User } from '../Models'
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing  } from './util';

export default class FollowingService {

    setAuth;
    cursor;


    constructor( setAuth){
        this.setAuth = setAuth;
        this.cursor = "none";

    }

    getFollowing = async ( alias: string, token: string): Promise< User[] | null> => {
        // return await ServerFacade.getFollowing(alias, token, this.setAuth);
        if(this.cursor === "end"){
            return null;
        }

        let res = await ServerFacade.getFollowing(alias, token, this.cursor, this.setAuth);
              
        if(res?.key){
            this.cursor = res?.key?.followeeAlias
        } else {
            this.cursor = "end"
        }

        console.log('resres: ', res);
        if(res){
            return res!.following;
        } else {
            return null;
        }
    }
}

export { follow, unFollow, isFollowing }