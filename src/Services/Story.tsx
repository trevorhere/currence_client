import moment from 'moment';
import { getUser } from '../API'
import { User, Status } from '../Models';
import { follow, unFollow, isFollowing  } from './util';


export const fetchUser = ( userID: string): User | null => {
    return getUser(userID);
} 
export const loadStatuses = ( userID:string): Status[] | null => {
    const user = getUser(userID);
    if(user){
        return [...user!.getStatuses()].sort((b, a) => moment(a.created_at).diff(b.created_at));
    }
    return null;
} 

export { follow, unFollow, isFollowing }