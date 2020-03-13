
import { User, Status } from '../Models'
import { addUser, getUsers, getUser  } from '../DB'
import moment from 'moment';

const URL = 'https://6d33ubfvvj.execute-api.us-east-1.amazonaws.com/dev'

// Auth 

export default class ServerFacade {



public static signup = async (email:string, alias:string, password:string) => {

    // if(!ServerFacade.goodAlias(alias)){
    //     return null;
    // }

    // const newUser = new User(alias, alias, email, password, "https://i.imgur.com/ylyowqj.png");
    // addUser(newUser);
    // currentUserID = await newUser.getID();

    // return  currentUserID;
}

public static signin =  async (alias:string, password:string): Promise< {message:string,alias:string, authenticated: boolean, token:string | null } | null> => {
    return await fetch(`${URL}/signin`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias,
            password,
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const {message, alias, authenticated, token} = data;
            return {message, alias, authenticated, token};

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}

public static goodAlias = async (alias): Promise<boolean> => {

    let result = true;

    if(!alias.match(/^[a-z]+$/i)) result = false;
    

    if(alias.length > 50) result = false;
    

    let existing_aliases = getUsers().filter(user => {
        return(alias === user.alias)
    });

    if(existing_aliases.length > 0) result = false;
    

    return await result;
}


// =====================
//        Feed 
// =====================


public static buildFeed = async ( alias: string | null,  statusCount: number,  authToken: string,) : Promise<Status[] | null> => {

    if(alias){
        let currUser = await getUser(alias);

        if(!currUser)
            return null;

        let statuses = await [...currUser.getStatuses()];
        let feed = await [...currUser.getFeed()];

        if(statuses.length > 0){
            statuses.map(status => {
                feed.push(status);
            });
        };

            return await [...feed.sort((b, a) => moment(a.created_at).diff(b.created_at)).slice(0, statusCount)]
        } else return null;
    }

    public static createStatus = async (userID:string, message: string): Promise<Status> => {
        const user = await getUser(userID);
        const newStatus = new Status(userID, user!.alias, message);
        user?.addStatus(newStatus);
        return await newStatus;
    }

// =====================
//        Followers 
// =====================

    public static  buildFollowers = async ( userID:string): Promise<User[] | null> => {
        if(userID){

            let currUser = await getUser(userID);

            if(!currUser)
                return null;

            let followers = currUser.getFollowers();
            return await [...followers];

        } else return null;
    }

// =====================
//        Following
// =====================

public static  buildFollowing = async ( userID:string): Promise<User[] | null> => {
    if(userID){

        let currUser =  getUser(userID);

        if(!currUser)
            return null;

        let following = currUser.getFollowing();
        return  [...following];

    } else return null;
}

// =====================
//        Story
// =====================

public static loadStatuses = async ( userID:string): Promise<Status[] | null> => {
    const user = getUser(userID);

    if(user){
        const statuses =  [...user!.getStatuses()].sort((b, a) => moment(a.created_at).diff(b.created_at));
        return statuses
    } else {
        return null;
    }
} 

// =====================
//        util
// =====================

    public static follow = async (userID: string, followeeID: string): Promise<void> => {
        const user =  getUser(userID);
        const followee = getUser(followeeID);

        await user?.addFollowing(followee!);
        await followee?.addFollower(user!);
    }

    public static unFollow = async (userID: string, followeeID: string): Promise<void> => {
        const user = getUser(userID);
        const followee = getUser(followeeID);

        await user!.removeFollowing(followee!);
        await followee!.removeFollower(user!);
    }

    public static  isFollowing = async (userID: string, followeeID: string): Promise<boolean> => {
        const user = await getUser(userID);
        return (user?.getFollowee(followeeID) !== undefined);
    }

    public static  getUser = async (userID: string): Promise<User | null> => {
        return await getUser(userID);
    }
}