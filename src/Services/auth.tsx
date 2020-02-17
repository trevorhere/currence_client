
import { User } from '../Models/User'
import { addUser, getUsers, setCurrentUser } from '../API'
import { authContext } from '../Context/authContext';

let currentUserID; 

export const signup = async (email:string, alias:string, password:string, setAuthenticatedUserIDCallback) => {

    if(!goodAlias(alias)){
        return null;
    }

    const newUser = new User(alias, alias, email, password, "https://i.imgur.com/ylyowqj.png");
    addUser(newUser);
    currentUserID = await newUser.getID();

    console.log('followers: ', newUser.getFollowers());
    console.log('following: ', newUser.getFollowing());
    console.log('feed: ', newUser.getFeed());

    setAuthenticatedUserIDCallback(currentUserID);
    return currentUserID;
}

export const signin =  async (alias:string, password:string, setAuthenticatedUserIDCallback) => {

    console.log('signing in');
    let currentUserArr = getUsers().filter(user => {
        return (user.alias === alias && user.password === password)
    });

    if(currentUserArr.length < 1){
        console.log('no user found');
        currentUserID = null;
        setAuthenticatedUserIDCallback(null);
        return null;
    } else {
        console.log('returning id: ', currentUserArr[0].getID())
        currentUserID = currentUserArr[0].getID();
        setAuthenticatedUserIDCallback(currentUserID);
        return currentUserID;
    }
}

export const signout = (setAuthenticatedUserIDCallback) => {
    currentUserID = null;
    setAuthenticatedUserIDCallback(null);
}

export const getCurrentUserID = (): string | null => {
    if(currentUserID != null){
        return currentUserID;
    } else {
        return null;
    }
}

export const goodAlias = (alias) => {

    let result = true;

    if(!alias.match(/^[a-z]+$/i)){
        console.log('failed on 2');
        result = false;
    }

    if(alias.length > 50){
        console.log('failed on 3');
        result = false;
    }

    let existing_aliases = getUsers().filter(user => {
        return(alias === user.alias)
    });

    if(existing_aliases.length > 0){
        result = false;
    }

    return result;
}




