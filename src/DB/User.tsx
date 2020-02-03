import { User } from '../Models/User'

let currentUser = new User("","","");

export const UserA = new User("idA","emailA","passwordA");
export const UserB = new User("idB","emailB","passwordB");
export const UserC = new User("idC","emailC","passwordC");

export const DB_Users = [
    UserA,UserB,UserC
]

export const setCurrentUser = (newCurrentUser: User) => {
    currentUser = newCurrentUser;
}

export const getCurrentUser = () => {
    return currentUser;
}

export const getUser = (user_id: string):  User | null => {

    let user = DB_Users.filter( user => {
        return user.getID() == user_id;
    })

    if(user.length > 0){
        return user[0];
    } else {
        return null;
    }
}

