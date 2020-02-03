import { UserA, UserB, UserC } from './User';
import { 
    StatusA1,
    StatusA2,
    StatusA3,
    StatusB1,
    StatusB2,
    StatusB3,
    StatusC1,
    StatusC2,
    StatusC3 
} from './Status';


export const seedDB = () => {

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