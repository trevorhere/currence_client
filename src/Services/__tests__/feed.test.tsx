import { signup } from '../auth'
import { getUser, addUser } from '../../API'
import { buildFeed, createStatus } from '../Feed'
import { User, Status } from '../../Models'
import { follow } from '../util'

it("handles createStatus properly", () => {
    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";
    const statusMessage = "this is a newly created test status";

    const user1 = new User(testAlias, testAlias,testEmail, testPassword, "");
    addUser(user1);

    expect(user1.getStatuses().length).toEqual(0);
    
    createStatus(user1.getID(), statusMessage).then(res => {
        expect(user1.getStatuses().length).toEqual(1);
        expect(user1.getStatuses()[0].getMessage()).toEqual(statusMessage);
    }).catch((err) => {
        console.log('ERROR: ', err)
    });

});

it("handles buildFeed properly",() => {
   

    const UserA = new User("aliasA", "aliasA", "emailA","passwordA", "url1");

    addUser(UserA);

    const  StatusA1 = new Status("aliasA","aliasA","whoop");
    const  StatusA2 = new Status("aliasA","aliasA","booop");
    const  StatusA3 = new Status("aliasA","aliasA","wuuut");


    UserA.addStatus(StatusA1)
    UserA.addStatus(StatusA2)
    UserA.addStatus(StatusA3)




    buildFeed(UserA.getID(), 2).then(feed => {
        expect(feed!.length).toEqual(2);
    }).catch(err => {console.log('ERROR: ', err)})

    buildFeed(UserA.getID(), 5).then(feed => {
      //  console.log('feed', feed)

        expect(feed!.length).toEqual(3);
    }).catch(err => {console.log('ERROR: ', err)})

})