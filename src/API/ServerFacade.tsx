
import { User, Status } from '../Models'
require('dotenv').config()

const local = false;
const URL = local?  'http://localhost:3000/dev':  ' https://pfgdmwka20.execute-api.us-east-1.amazonaws.com/dev'

export default class ServerFacade {

public static signup = async (alias: string, password: string, picture: string) => {

    return await fetch(`${URL}/signup`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias,
            password,
            picture
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

public static signin =  async ( alias: string, password: string ): Promise< {message:string,alias:string, authenticated: boolean, token:string | null } | null> => {
    
    console.log('test1: ', process.env.REACT_TEST);
    console.log('test2: ', process.env.TEST);
    console.log('test3: ', process.env.REACT_APP_TEST);


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
    return await fetch(`${URL}/alias/?alias=${alias}`,{
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
       // console.log(data);
        const { result } = data;
        return result;

    }).catch(e => {
        console.log('error: ', e.message)
        return null;
    })
}


// =====================
//        Feed 
// =====================


public static getFeed = async ( alias: string | null,  statusCount: number,  token: string ) : Promise<Status[] | null> => {
    return await fetch(`${URL}/feed/?alias=${alias}&token=${token}`,{
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
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
    }

public static createStatus = async ( alias: string, message: string, token: string ): Promise<Status> => {
    return await fetch(`${URL}/status/?token=${token}`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias,
            message
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const { status } = data;
            return status;

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}

// =====================
//        Followers 
// =====================

    public static  getFollowers = async ( alias: string, token: string ): Promise<User[] | null> => {
        return await fetch(`${URL}/followers/?alias=${alias}&token=${token}`,{
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }, 
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

public static  getFollowing = async ( alias: string, token: string): Promise<User[] | null> => {
    return await fetch(`${URL}/following/?alias=${alias}&token=${token}`,{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json" }
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

public static getStory = async ( alias: string ): Promise<Status[] | null> => {
    return await fetch(`${URL}/story/?alias=${alias}`,{
        method: "GET",
        mode: "cors",
            headers: { "Content-Type": "application/json" }, 
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
        return await fetch(`${URL}/follow/?token=${token}`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                alias,
                followeeAlias
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
        return await fetch(`${URL}/unfollow/?token=${token}`,{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                alias,
                followeeAlias
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

    public static  isFollowing = async (alias: string, followeeAlias: string, token: string ): Promise<boolean> => {
        return await fetch(`${URL}/isfollowing/?alias=${alias}&token=${token}&followeeAlias=${followeeAlias}`,{
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
           // console.log(data);
            const { result } = data;
            return result;

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
    }

    public static  getUser = async (alias: string): Promise<User | null> => {
        return await fetch(`${URL}/user/?alias=${alias}`,{
                method: "GET",
                mode: "cors",
                headers: { "Content-Type": "application/json", }
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
