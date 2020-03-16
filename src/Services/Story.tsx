import { Status } from '../Models';
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing, getUser } from './util';

export const getStory = async ( alias:string):  Promise<Status[] | null> => {
    return await ServerFacade.getStory(alias);
} 

export { follow, unFollow, isFollowing, getUser }