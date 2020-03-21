// import  { Status } from '../Models'
// import ServerFacade from '../API/ServerFacade'


// export const  getFeed = async ( alias: string | null, statusCount: number, token: string): Promise<Status[] | null> => {
//     return await ServerFacade.getFeed(alias, statusCount, token)
// }

// export const createStatus = async (alias:string, message: string, token:string ): Promise<Status | null> => {
//     return await ServerFacade.createStatus(alias, message, token).then((result) => {
//      //   console.log(result);
//         return result;
//     }).catch((err) => {
//         console.log(err)
//         return err;
//     });
// } 


import  { Status } from '../Models'
import ServerFacade from '../API/ServerFacade'

export default class FeedService {

    setAuth;

    constructor( setAuth){
        this.setAuth = setAuth;
    }

    getFeed = async ( alias: string | null, statusCount: number, token: string): Promise<Status[] | null> => {
        return await ServerFacade.getFeed(alias, statusCount, token, this.setAuth)
    }

    createStatus = async (alias:string, message: string, token:string ): Promise<Status | null> => {
        return await ServerFacade.createStatus(alias, message, token, this.setAuth).then((result) => {
         //   console.log(result);
            return result;
        }).catch((err) => {
            console.log(err)
            return err;
        });
    } 
    

}
