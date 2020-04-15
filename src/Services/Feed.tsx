import  { Status } from '../Models'
import ServerFacade from '../API/ServerFacade'

export default class FeedService {

    setAuth;
    cursor;

    constructor(setAuth){
        this.setAuth = setAuth;
        this.cursor = "none";
    }

    getFeed = async ( alias: string , token: string): Promise<{feed:any, user:any} | null | any> => {
        console.log('getFeed pre settings: ',  this.cursor)
    
        if(this.cursor === "end"){
            return null;
        }

        let res = await ServerFacade.getFeed(alias, token, this.cursor, this.setAuth)
        console.log('getFeed res: ', res);
        if(res?.key){
            this.cursor = res?.key?.id
        } else {
            this.cursor = "end"
        }

        console.log('getFeed post settings: ',  this.cursor)

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
