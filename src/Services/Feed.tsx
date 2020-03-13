import  { Status } from '../Models'
import ServerFacade from '../API/ServerFacade'


export const  buildFeed = async ( alias: string | null, statusCount: number, token: string): Promise<Status[] | null> => {
    return await ServerFacade.buildFeed(alias, statusCount, token)
}

export const createStatus = async (alias:string, message: string): Promise<Status | null> => {
    return await ServerFacade.createStatus(alias, message).then((result) => {
     //   console.log(result);
        return result;
    }).catch((err) => {
        console.log(err)
        return err;
    });
} 
