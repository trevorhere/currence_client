import { Status } from '../Models';
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing, getUser } from './util';

export default class StoryService {

    cursor;
    currAlias;

    constructor(){
        this.cursor = "none";
    }

    getStory = async ( alias:string):  Promise< any | null> => {
        if(alias){
            console.log('getStory pre settings: ', this.currAlias, this.cursor)

            if(this.currAlias !== alias){
                this.currAlias = alias;
                this.cursor = "none"
            }

            if(this.currAlias === alias && this.cursor === "end"){
                return null;
            }

            console.log('getStory mid settings: ', this.currAlias, this.cursor)


            let res = await ServerFacade.getStory(alias, this.cursor);
            console.log('getStory res: ', res);

            if(res?.key){
                this.currAlias = res?.key?.alias;
                this.cursor = res?.key?.id
                console.log('ca: ', this.currAlias)

            } else {
                this.cursor = "end"
            }

            console.log('getStory post settings: ', this.currAlias, this.cursor)

            if(res){
                return { 
                    story: res!.story,
                    user: res!.user
                }
            } else {
                return null;
            }
        } 
    }
}
export { follow, unFollow, isFollowing, getUser }