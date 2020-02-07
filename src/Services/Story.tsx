import { getUser } from '../DB'
import { User, Status } from '../Models';

let viewUpdater = (newarr: Status[] | void) => {};
let viewFetcher = () => {};

export const fetchUser = ( user_id: string): User | null => {
    return getUser(user_id);
} 

export const loadStatuses = ( user_id: string | null | undefined, setUserStatuses:(statuses: Status[] | undefined ) => void): void => {
    let statusArr = getUser(user_id!)?.getStatuses();
    setUserStatuses(statusArr);
} 


export const setViewUpdater = ( updaterFunction: () => void ): void => {
    viewUpdater = updaterFunction;
}

export const setViewFetcher = ( fetcherFunction: () => void ): void => {
    viewFetcher = fetcherFunction;
}


export const saveStatus = (status: string, user_id: string): void => {
    const newStatus = new Status(user_id, status);

    fetchUser(user_id)?.addStatus(newStatus);
    let currViewArr = viewFetcher();
    viewUpdater(currViewArr);
    console.log(status);
}


    // const fetchUserStatuses = async () => {
    //     const fetchUserId = await setUser_id(props?.match?.params.user_id);
    //     console.log('working', getUser(user_id)?.getStatuses());
    //     setUserStatuses(getUser(user_id)?.getStatuses())
    //   }