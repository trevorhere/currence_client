import { Status } from '../Models';
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing, getUser } from './util';

export const loadStatuses = async ( userID:string):  Promise<Status[] | null> => {
    return await ServerFacade.loadStatuses(userID);
} 

export { follow, unFollow, isFollowing, getUser }