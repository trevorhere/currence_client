import { User, Status } from '../../Models'
import { loadStatuses } from '../Story'

it("handles loadStatues for Views/Story properly",() => {

    const user1 = new User("alias1","alias1","email1","password1", "picture");

    const status1 = new Status(user1.getID(), user1.getAlias(), "status1");
    const status2 = new Status(user1.getID(),user1.getAlias(), "status2");
    const status3 = new Status(user1.getID(), user1.getAlias(),"status3");

    expect(user1.getStatuses().length).toEqual(0);

    user1.addStatus(status1);
    user1.addStatus(status2);
    user1.addStatus(status3);

    expect(user1.getStatuses().length).toEqual(3);
});

it("handles bad userID properly when loadStatuses runs",() => {
    expect(loadStatuses("bad data")).toEqual(null);
});