import { User } from '../Models/User'

let currentUser = new User("","");

const UserA = new User("emailA","passwordA");
const UserB = new User("emailB","passwordB");
const UserC = new User("emailC","passwordC");

export const DB_Users = [
    UserA,UserB,UserC
]

export const setCurrentUser = (newCurrentUser: User) => {
    currentUser = newCurrentUser;
}

export const getCurrentUser = () => {
    return currentUser;
}

