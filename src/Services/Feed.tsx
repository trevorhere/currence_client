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
    key;

    constructor(setAuth){
        this.setAuth = setAuth;
        this.key = "";
    }

    getFeed = async ( alias: string | null, statusCount: number, token: string): Promise<{feed:any, user:any} | null | any> => {
        console.log(`before: \n ${this.key}`)
        let res = await ServerFacade.getFeed(alias, statusCount, token, this.key, this.setAuth)
        console.log('res: ', res);
        this.key =  JSON.stringify(res?.key);
        console.log(`after: \n ${this.key}`)

        return { feed: res!.feed, user: res!.user } ;
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
