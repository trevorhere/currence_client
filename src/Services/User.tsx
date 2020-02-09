
import { User } from '../Models/User'
import { Status } from '../Models/Status'

import { DB_Users, DB_Statuses } from '../DB'

let currentUserID; 

export const signup = async (email:string, alias:string, password:string) => {
    const newUser = new User(alias, email, alias, password);
    DB_Users.push(newUser);
    currentUserID = newUser.getID();

    const StatusX1 = new Status(alias,`this is status 1 for ${alias}`);
    const StatusX2 = new Status(alias,`this is status 2 for ${alias}`);
    const StatusX3 = new Status(alias,`this is status 3 for ${alias}`);

    DB_Statuses.push(StatusX1, StatusX2, StatusX3);
    return currentUserID;
}

export const signin =  async (alias:string, password:string) => {
    console.log('signing in');
    let currentUserArr = DB_Users.filter(user => {
        return (user.alias == alias && user.password == password)
    });

    if(currentUserArr.length < 1){
        console.log('no user found');
        currentUserID = null;
        return null;;

    } else {
        console.log('returning id: ', currentUserArr[0].getID())
        currentUserID = currentUserArr[0].getID();
        return currentUserID;
    }
}

export const signout = () => {
    currentUserID = null;
    console.log('signing out');
    console.log('current user ID: ', currentUserID);
    // window.location.reload();
}

export const getCurrentUserID = (): string | null => {
    if(currentUserID != null){
        return currentUserID;
    } else {
        return null;
    }
}



