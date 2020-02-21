import { addUser } from '../../API'
import { User } from '../../Models'
import { buildFollowers } from '../Followers'
import { follow } from '../util'


it("handles buildFollowing properly",() => {

    const user1 = new User("alias1","alias1","email1","password1", "picture");
    const user2 = new User("alias2","alias2","email2","password2", "picture");
    const user3 = new User("alias3","alias3","email3","password3", "picture");

    addUser(user1);
    addUser(user2);
    addUser(user3);

    buildFollowers(user1.getID()).then(res => {
        expect(res?.length).toEqual(0);
    }).catch(err => {console.log('ERROR: ', err)})

    follow(user2.getID(), user1.getID(),);
    follow(user3.getID(), user1.getID(),);

    buildFollowers(user1.getID()).then(res => {
        expect(res?.length).toEqual(2);
    }).catch(err => {console.log('ERROR: ', err)})

});

it("handles userID error properly when buildFollowers runs",() => {
    buildFollowers("badID").then(res => {
        expect(res).toEqual(null);
    }).catch(err => {console.log('ERROR: ', err)})
});