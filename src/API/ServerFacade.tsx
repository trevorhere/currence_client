
import { User, Status } from '../Models'
import { addUser, getUsers, getUser  } from '../DB'
import moment from 'moment';

const local = false;
const URL = local?  'http://localhost:3000/dev':  'https://6d33ubfvvj.execute-api.us-east-1.amazonaws.com/dev'

// Auth 

export default class ServerFacade {

public static signup = async ( email: string, alias: string, password: string) => {

    // if(!ServerFacade.goodAlias(alias)){
    //     return null;
    // }

    // const newUser = new User(alias, alias, email, password, "https://i.imgur.com/ylyowqj.png");
    // addUser(newUser);
    // currentUserID = await newUser.getID();

    // return  currentUserID;
}

public static signin =  async ( alias: string, password: string ): Promise< {message:string,alias:string, authenticated: boolean, token:string | null } | null> => {
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
            const {message, alias, authenticated, token} = data;
            return {message, alias, authenticated, token};

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}

public static goodAlias = async ( alias: string ): Promise<boolean> => {

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


public static buildFeed = async ( alias: string | null,  statusCount: number,  token: string ) : Promise<Status[] | null> => {
    return await fetch(`${URL}/getFeed`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias,
            token
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
           // console.log(data);
            const { feed } = data;
            return feed;

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })

    // if(alias){
    //     let currUser = await getUser(alias);

    //     if(!currUser)
    //         return null;

    //     let statuses = await [...currUser.getStatuses()];
    //     let feed = await [...currUser.getFeed()];

    //     if(statuses.length > 0){
    //         statuses.map(status => {
    //             feed.push(status);
    //         });
    //     };

    //         return await [...feed.sort((b, a) => moment(a.created_at).diff(b.created_at)).slice(0, statusCount)]
    //     } else return null;
    }

    public static createStatus = async ( alias: string, message: string ): Promise<Status> => {
        const user = await getUser(alias);
        const newStatus = new Status(alias, user!.alias, message);
        user?.addStatus(newStatus);
        return await newStatus;
    }

// =====================
//        Followers 
// =====================

    public static  buildFollowers = async ( alias: string, token: string ): Promise<User[] | null> => {
        return await fetch(`${URL}/getFollowers`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                alias,
                token
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { followers } = data;
                return followers;
    
            }).catch(e => {
                console.log('error: ', e.message)
                return null;
            })
    }

// =====================
//        Following
// =====================

public static  buildFollowing = async ( alias: string, token: string): Promise<User[] | null> => {
    return await fetch(`${URL}/getFollowing`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias,
            token
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const { following } = data;
            return following;

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}

// =====================
//        Story
// =====================

public static loadStatuses = async ( alias: string ): Promise<Status[] | null> => {
    return await fetch(`${URL}/getStory`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias
            })
        })
        .then((response) => {
            if(response.status !== 200) throw new Error(response['message']);
            return response.json();
        })
        .then((data) => {
            const {story} = data;
            return story;

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
} 

// =====================
//        util
// =====================

    public static follow = async (alias: string, followeeAlias: string, token: string ): Promise<User | null> => {
        return await fetch(`${URL}/follow`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                alias,
                followeeAlias, 
                token
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { user } = data;
                return user;
    
            }).catch(e => {
                console.log('error: ', e.message)
                return null;
            })
    }

    public static unFollow = async (alias: string, followeeAlias: string, token:string ): Promise<void> => {
        return await fetch(`${URL}/unfollow`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                alias,
                followeeAlias, 
                token
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { user } = data;
                return user;
    
            }).catch(e => {
                console.log('error: ', e.message)
                return null;
            })
    }

    public static  isFollowing = async (alias: string, followeeAlias: string): Promise<boolean> => {
        const user = await getUser(alias);
        return (user?.getFollowee(followeeAlias) !== undefined);
    }

    public static  getUser = async (alias: string): Promise<User | null> => {
        return await fetch(`${URL}/getUser`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                alias,
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const {user} = data;
                return user;
    
            }).catch(e => {
                console.log('error: ', e.message)
                return null;
            })
    }
}