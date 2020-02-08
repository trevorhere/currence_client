import { User, Status } from '../Models'

export const DB_Users:User[] = [];
export const DB_Statuses: Status[] = [];

export const seedDB = () => {

    console.log('🌱 seeding DB  🌱')  

    const UserA = new User("idA","emailA","passwordA");
    const UserB = new User("idB","emailB","passwordB");
    const UserC = new User("idC","emailC","passwordC");

    DB_Users.push(UserA, UserB, UserC);

    const  StatusA1 = new Status("idA","this is status A1");
    const  StatusA2 = new Status("idA","this is status A2");
    const  StatusA3 = new Status("idA","this is status A3");

    const  StatusB1 = new Status("idB","this is status B1");
    const  StatusB2 = new Status("idB","this is status B2");
    const  StatusB3 = new Status("idB","this is status B3");

    const  StatusC1 = new Status("idC","this is status C1");
    const  StatusC2 = new Status("idC","this is status C2");
    const  StatusC3 = new Status("idC","this is status C3");

    DB_Statuses.push(
        StatusA1,
        StatusA2, 
        StatusA3, 
        StatusB1, 
        StatusB2, 
        StatusB3, 
        StatusC1, 
        StatusC2,
        StatusC3
    )

    // add followers for every user
    UserA.addFollower(UserB);
    UserA.addFollower(UserC);

    UserB.addFollower(UserA);
    UserB.addFollower(UserC);

    UserC.addFollower(UserA);
    UserC.addFollower(UserB);

    // add followees for every user
    UserA.addFollowing(UserB);
    UserA.addFollowing(UserC);

    UserB.addFollowing(UserA);
    UserB.addFollowing(UserC);

    UserC.addFollowing(UserA);
    UserC.addFollowing(UserB);

    // add statuses for every user
    UserA.addStatus(StatusA1);
    UserA.addStatus(StatusA2);
    UserA.addStatus(StatusA3);

    UserB.addStatus(StatusB1);
    UserB.addStatus(StatusB2);
    UserB.addStatus(StatusB3);

    UserC.addStatus(StatusC1);
    UserC.addStatus(StatusC2);
    UserC.addStatus(StatusC3);
}

