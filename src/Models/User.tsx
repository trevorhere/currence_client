
import { Status } from './Status';

export class User {
    id: string;
    email:string;
    password: string;
    followers: User[];
    followees: User[];
    statuses: Status[];

    constructor(id: string, email:string, password:string){
        this.id = id;
        this.email = email;
        this.password = password;
        this.followers = [];
        this.followees = [];
        this.statuses = []
    }
    
    getID():string{
        return this.id;
    }
    setEmail(email:string): void {
        this.email = email;
    };
    getEmail(): string{
        return this.email;
    };
    setPassowrd(password:string): void {
        this.password = password;
    };
    getPassword(): string{
        return this.password;
    };
    addFollower(follower: User): void{
        this.followers.push(follower);
    }
    getFollower(user_id: string): User | null{
        let follower  = this.followers.filter(follower => {
            return follower.getID() == user_id;
        })

        if(follower.length > 0){
            return follower[0];
        } else {
            return null;
        }
    }
    getFollowers(): User[]{
       return this.followers;
    }
    addFollowee(followee: User): void{
        this.followees.push(followee);
    }
    getFollowee(user_id: string): User | null{
        let followee  = this.followees.filter(followee => {
             return followee.getID() == user_id;
        })

        if(followee.length > 0){
            return followee[0];
        } else {
            return null;
        }
    }
    getFollowees(): User[]{
       return this.followees;
    }
    addStatus(status: Status): void {
       this.statuses.push(status);
    }
    getStatuses(): Status[] {
        console.log(this.statuses);
        
        return this.statuses;
    }
}
