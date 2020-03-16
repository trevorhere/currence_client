import { addUser } from '../../API'
import { User } from '../../Models'
import { getFollowing } from '../Following'
import { follow } from '../util'

it("handles getFollowing properly",() => {

    const user1 = new User("alias1","alias1","email1","password1", "picture");
    const user2 = new User("alias2","alias2","email2","password2", "picture");
    const user3 = new User("alias3","alias3","email3","password3", "picture");

    addUser(user1);
    addUser(user2);
    addUser(user3);

    // follow(user1.getID(), user2.getID());
    // follow(user1.getID(), user3.getID());

    // getFollowing(user1.getID()).then(res => {
    //     expect(res?.length).toEqual(2);
    // }).catch(err => { console.log('ERROR: ', err)})
});

it("handles userID error properly when buildFollowing runs",() => {
    // getFollowing("badID").then(res => {
    //     expect(res).toEqual(null);
    // }).catch(err => { console.log('ERROR: ', err)})
});