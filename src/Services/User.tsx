
import { User } from '../Models/User'
import { DB_Users } from '../DB/User'


let currentUser: User | null;


export const signup = (email:string, password:string): void => {
    const newUser = new User(email,password);
    DB_Users.push(newUser);
    currentUser= newUser;
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


