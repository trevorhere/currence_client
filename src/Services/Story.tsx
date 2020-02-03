import { getUser } from '../DB'
import { User, Status } from '../Models';

export const fetchUser = ( user_id: string): User | null => {
    return getUser(user_id);
} 


export const loadStatuses = ( user_id: string, setUserStatuses:(statuses: Status[] | undefined) => void): void => {
    let statusArr = getUser(user_id)?.getStatuses();
    setUserStatuses(statusArr);
} 



    // const fetchUserStatuses = async () => {
    //     const fetchUserId = await setUser_id(props?.match?.params.user_id);
    //     console.log('working', getUser(user_id)?.getStatuses());
    //     setUserStatuses(getUser(user_id)?.getStatuses())
    //   };