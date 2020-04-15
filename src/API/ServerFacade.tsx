
import { User, Status } from '../Models'
require('dotenv').config()


const URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_AWS_URL: 'http://localhost:3000/dev'
// const URL = "https://pfgdmwka20.execute-api.us-east-1.amazonaws.com/dev";


console.log('URL: ', URL);

export default class ServerFacade {

public static signup = async (alias: string, password: string, base64: any) => {


    return await fetch(`${URL}/signup`,{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            alias,
            password,
            picture: base64
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const {message, alias, authenticated, token} = data;
            console.log('token: ', token);
            return {message, alias, authenticated, token};

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}

public static signin =  async ( alias: string, password: string ): Promise< {message:string,alias:string, authenticated: boolean, token:string | null } | null> => {
    
    console.log('test2: ', process.env.NODE_ENV);
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


public static getFeed = async ( alias: string | null,  statusCount: number,  token: string, key:string, setAuth: (arg:any) => {}  ) : Promise< {feed:any, key: any, user:any} | null> => {
    return await fetch(`${URL}/feed_page/?alias=${alias}&token=${token}&count=${statusCount}&key=${key}`,{
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if(response.status === 401) {
                setAuth(null);
                throw new Error("[401] Unable to authenticate");
            }

            return response.json();
        })
        .then((data) => {
           // console.log(data);
            const { feed, key, user } = data;
            console.log('feed user: ', user)
            return { feed, key, user };

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
    }

public static createStatus = async ( alias: string, message: string, token: string, setAuth: (arg:any) => {}): Promise<Status> => {
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
            if(response.status === 401) {
                setAuth(null);
                throw new Error("[401] Unable to authenticate");
            }

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

public static  getFollowers = async ( alias: string, token: string, key: string, setAuth: (arg:any) => {} ): Promise< {followers: any, key: any} | null> => {
    return await fetch(`${URL}/followers/?alias=${alias}&token=${token}&key=${key}`,{
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            }, 
        })
        .then((response) => {
            if(response.status === 401) {
                setAuth(null);
                throw new Error("[401] Unable to authenticate");
            }

            return response.json();
        })
        .then((data) => {
            const { followers, key } = data;
            return { followers, key };

        }).catch(e => {
            console.log('ServerFacade.getFollowers error: ', e.message)
            return null;
        })
}

// =====================
//        Following
// =====================

public static  getFollowing = async ( alias: string, token: string, key: string, setAuth: (arg:any) => {} ): Promise<  {following: any, key: any} | null> => {
    return await fetch(`${URL}/following/?alias=${alias}&token=${token}&key=${key}`,{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json" }
        })
        .then((response) => {
            if(response.status === 401) {
                setAuth(null);
                throw new Error("[401] Unable to authenticate");
            }
            return response.json();
        })
        .then((data) => {
            const { following, key } = data;
            return { following, key };

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}

// =====================
//        Story
// =====================

public static getStory = async ( alias: string, key: string | null ): Promise< any | null> => {
    return await fetch(`${URL}/story/?alias=${alias}&key=${key}`,{
        method: "GET",
        mode: "cors",
            headers: { "Content-Type": "application/json" }, 
        })
        .then((response) => {
            if(response.status !== 200) throw new Error(response['message']);
            return response.json();
        })
        .then((data) => {
            const {story, key, user } = data;
            return { story, key, user };

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
    return await fetch(`${URL}/isFollowing/?alias=${alias}&token=${token}&followeeAlias=${followeeAlias}`,{
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
        console.log('result: ', result)
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
            // console.log('user: ',user)
            return user;

        }).catch(e => {
            console.log('error: ', e.message)
            return null;
        })
}
}
