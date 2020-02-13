
import { Status } from './Status';
export class User {
    id: string;
    email:string;
    alias:string;
    password: string;
    followers: User[];
    following: User[];
    statuses: Status[];
    picture: string;

    constructor(id: string, alias:string, email:string, password:string,picture:string){
        this.id = alias;
        this.email = email;
        this.alias = alias;
        this.password = password;
        this.followers = [];
        this.following = [];
        this.statuses = [];
        this.picture = picture;
    }

    getID():string{
        return this.id;
    }
    getPicture():string{
        return this.picture;
    }
    getAlias():string{
        return this.alias;
    }
    setEmail(email:string): void {
        this.email = email;
    };
    getEmail(): string{
        return this.email;
    };
    setPassword(password:string): void {
        this.password = password;
    };
    getPassword(): string{
        return this.password;
    };
    addFollower(user: User): void{
        this.followers.push(user);
    }
    removeFollower(user: User): void {
        this.followers.filter(follower => follower.id !==  user.id)
    }
    getFollower(userID: string): User | undefined{
        return this.followers.find(follower =>  follower.id === userID)
    }
    getFollowers(): User[]{
        return this.followers;
    }
    setFollowers(followers: User[]): void {
        this.followers = [...followers];
    }
    addFollowing(user: User): void{
        this.following.push(user);
    }
    removeFollowing(user: User): void {
        this.setFollowing(this.following.filter(followee => followee.id !==  user.id))
    }
    getFollowee(userID: string): User | undefined {
        return this.following.find(followee =>  followee.id === userID)
    }
    setFollowing(followees: User[]): void {
    this.following = [...followees];
    }
    getFollowing(): User[]{
        return this.following;
    }
    addStatus(status: Status): void {
        this.statuses.push(status);
        console.log(this.email,'added status: ', status.id, status.message)
    }
    getStatuses(): Status[] {   
        console.log('get statuses: ',[...this.statuses])     
        return this.statuses;
    }
}
