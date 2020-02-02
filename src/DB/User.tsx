import { User } from '../Models/User'

let currentUser = new User("","","");

const UserA = new User("emailA","emailA","passwordA");
const UserB = new User("emailA","emailB","passwordB");
const UserC = new User("emailA","emailC","passwordC");


// add followers for every user
UserA.addFollower(UserB);
UserA.addFollower(UserC);

UserB.addFollower(UserA);
UserB.addFollower(UserC);

UserC.addFollower(UserA);
UserC.addFollower(UserB);

// add followees for every user
UserA.addFollowee(UserB);
UserA.addFollowee(UserC);

UserB.addFollowee(UserA);
UserB.addFollowee(UserC);

UserC.addFollowee(UserA);
UserC.addFollowee(UserB);




export const DB_Users = [
    UserA,UserB,UserC
]

export const setCurrentUser = (newCurrentUser: User) => {
    currentUser = newCurrentUser;
}

export const getCurrentUser = () => {
    return currentUser;
}

