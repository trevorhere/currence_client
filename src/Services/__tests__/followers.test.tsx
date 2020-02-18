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

    const preBuiltFollowing = buildFollowers(user1.getID());
    expect(preBuiltFollowing?.length).toEqual(0);

    follow(user2.getID(), user1.getID(),);
    follow(user3.getID(), user1.getID(),);

    const postBuiltFollowers = buildFollowers(user1.getID());
    expect(postBuiltFollowers?.length).toEqual(2);
});

it("handles userID error properly when buildFollowers runs",() => {
    const preBuiltFollowers= buildFollowers("badID");
    expect(preBuiltFollowers).toEqual(null);
});