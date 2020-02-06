
import { User } from '../Models/User'
import { Status } from '../Models/Status'

import { DB_Users, DB_Statuses } from '../DB'

let currentUserID: string | null;


export const signup = async (email:string, password:string) => {
    const newUser = new User(email, email,password);
    DB_Users.push(newUser);
    currentUserID= newUser.getID();

    const StatusX1 = new Status(email,`this is status 1 for ${email}`);
    const StatusX2 = new Status(email,`this is status 2 for ${email}`);
    const StatusX3 = new Status(email,`this is status 3 for ${email}`);

    DB_Statuses.push(StatusX1, StatusX2, StatusX3);

    return newUser.getID();
}

export const signin =  async (email:string, password:string) => {
    console.log('signing in');
    let currentUserArr = DB_Users.filter(user => {
        return (user.email == email && user.password == password)
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


