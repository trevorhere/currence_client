
import { User } from '../Models/User'
import { Status } from '../Models/Status'

import { DB_Users } from '../DB/User'
import { DB_Statuses } from '../DB/Status'


let currentUser: User | null;


export const signup = (email:string, password:string): void => {
    const newUser = new User(email, email,password);
    DB_Users.push(newUser);
    currentUser= newUser;

    const StatusX1 = new Status(email,`this is status 1 for ${email}`);
    const StatusX2 = new Status(email,`this is status 2 for ${email}`);
    const StatusX3 = new Status(email,`this is status 3 for ${email}`);

    DB_Statuses.push(StatusX1, StatusX2, StatusX3);
}

export const signin = (email:string, password:string): void => {
    console.log('signing in');
    let currentUserArr = DB_Users.filter(user => {
        return (user.email == email && user.password == password)
    });

    if(currentUserArr.length < 1){
        console.log('no user found');
        currentUser = null;

    } else {
        currentUser = currentUserArr[0];
    }
}

export const signout = () => {
    currentUser = null;
    console.log('signing out');
    console.log('current user: ', currentUser);
    window.location.reload();
}

export const getCurrentUser = (): User | null => {
    if(currentUser != null){
        return currentUser;
    } else {
        return null;
    }
}


