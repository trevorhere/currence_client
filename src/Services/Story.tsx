import { Status } from '../Models';
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing, getUser } from './util';

export default class StoryService {

    key;

    constructor(){
        this.key = "";
    }

    getStory = async ( alias:string):  Promise<Status[] | null> => {
        let res = await ServerFacade.getStory(alias, this.key);
        console.log('res: ', res);
        this.key =  JSON.stringify(res?.key);
        if(res){
            return res!.story;
        } else {
            return null;
        }
    } 
}
export { follow, unFollow, isFollowing, getUser }