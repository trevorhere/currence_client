import { Status } from '../Models';
import ServerFacade from '../API/ServerFacade'
import { follow, unFollow, isFollowing, getUser } from './util';

export const loadStatuses = async ( alias:string):  Promise<Status[] | null> => {
    return await ServerFacade.loadStatuses(alias);
} 

export { follow, unFollow, isFollowing, getUser }