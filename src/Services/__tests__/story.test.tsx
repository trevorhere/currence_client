import { User, Status } from '../../Models'
import { loadStatuses } from '../Story'
import { addUser  } from '../../API'


it("handles loadStatues for Views/Story properly",() => {

    const user1 = new User("alias1","alias1","email1","password1", "picture");
    addUser(user1)

    const status1 = new Status(user1.getID(), user1.getAlias(), "status1");
    const status2 = new Status(user1.getID(),user1.getAlias(), "status2");
    const status3 = new Status(user1.getID(), user1.getAlias(),"status3");


    user1.addStatus(status1);
    user1.addStatus(status2);
    user1.addStatus(status3);

    loadStatuses(user1.getID()!).then(res => {
        expect(res!.length).toEqual(3)
    }).catch(err => {
        console.log('ERROR', err);
    })


});

it("handles bad userID properly when loadStatuses runs",() => {
    loadStatuses("bad data").then(res => {
        expect(res).toEqual(null)
    }).catch(err => {
        console.log('ERROR', err);
    })

});