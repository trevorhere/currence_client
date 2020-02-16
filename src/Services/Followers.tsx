import { getUser } from '../API'
import * as util from 'util';

export const  buildFollowers = ( userID:string | null) => {

    if(userID){

        let currUser = getUser(userID);
       // console.log('followers: \n', util.inspect(currUser?.getFollowers()));

        if(!currUser)
            return null;

        let followers = currUser.getFollowers();
        return [...followers];

    } else return null;
}