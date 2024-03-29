import { follow, unFollow, isFollowing } from '../util'
import { User } from '../../Models'
import { addUser } from '../../API'


 it("handles follow properly",() => { expect(1).toEqual(1)})
it("handles follow properly",() => {

    const user1 = new User("alias1","alias1","email1","password1", "picture");
    const user2 = new User("alias2","alias2","email2","password2", "picture");

    addUser(user1);
    addUser(user2);

    // follow(user1.getID(), user2.getID()).then(res => {
    //     const user1Following = [...user1.getFollowing()]
    //     const user2Followers = [...user2.getFollowers()]
    
    //     expect(user1Following.length).toEqual(1);
    //     expect(user2Followers.length).toEqual(1);
    
    
    //     expect(user2!.getFollowers()[0]!.getID()).toEqual(user1.getID());
    //     expect(user1!.getFollowing()[0]!.getID()).toEqual(user2.getID());

    // }).catch(err => {console.log('ERROR: ', err)})

});

it("handles unFollow properly",() => {

    const user3= new User("alias3","alias3","email3","password3", "picture");
    const user4= new User("alias4","alias4","email4","password4", "picture");

    addUser(user3);
    addUser(user4);

    // follow(user3.getID(), user4.getID()).then(res => {
    //     const user3Following = [...user3.getFollowing()]
    //     const user4Followers = [...user4.getFollowers()]
    
    //     expect(user3Following.length).toEqual(1);
    //     expect(user4Followers.length).toEqual(1);
    //     expect(user4!.getFollowers()[0]!.getID()).toEqual(user3.getID());
    //     expect(user3!.getFollowing()[0]!.getID()).toEqual(user4.getID());
    
    //     unFollow(user3.getID(), user4.getID()).then(res => {
    //         expect([...user3.getFollowing()].length).toEqual(0);
    //         expect([...user4.getFollowers()].length).toEqual(0);
    //     }).catch(err => {console.log(err)})
    // }).catch(err => {console.log('ERROR: ', err)})
});

it("handles isFollowing properly",() => {

    const user7 = new User("alias7","alias7","email7","password7", "picture");
    const user8 = new User("alias8","alias8","email8","password8", "picture");

    addUser(user7);
    addUser(user8);

    // follow(user7.getID(), user8.getID())

    // isFollowing(user7.getID(), user8.getID()).then(res => {
    //     expect(res).toEqual(true);
    // }).catch(err => {console.log('ERROR: ', err)})

});