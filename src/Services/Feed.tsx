import  { Status } from '../Models'
import ServerFacade from '../API/ServerFacade'


export const  buildFeed = async ( userID: string | null, statusCount: number): Promise<Status[] | null> => {
    return await ServerFacade.buildFeed(userID, statusCount)
}

export const createStatus = async (userID:string, message: string): Promise<Status | null> => {
    return await ServerFacade.createStatus(userID, message).then((result) => {
     //   console.log(result);
        return result;
    }).catch((err) => {
        console.log(err)
        return err;
    });
} 
