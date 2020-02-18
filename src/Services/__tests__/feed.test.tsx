import { signup } from '../auth'
import { getUser } from '../../API'
import { buildFeed, createStatus } from '../Feed'

it("handles createStatus properly", () => {
    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";
    let expectedUserID = null;
    const statusMessage = "this is a newly created test status";

    signup(testEmail, testAlias, testPassword, () => {}).then(res => {
        expectedUserID = res;
        const user = getUser(expectedUserID!);
        expect(user!.getEmail()).toEqual(testEmail);
        expect(user!.getAlias()).toEqual(testAlias);
        expect(user!.getPassword()).toEqual(testPassword);

        const preStatusCount = user?.getStatuses().length;
        const newStatus = createStatus(expectedUserID!, statusMessage);
        const postStatusCount = user?.getStatuses().length;

        expect(preStatusCount).toBeLessThan(postStatusCount!);
        expect(newStatus.message).toEqual(statusMessage);
    });
});

it("handles buildFeed properly",() => {
    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";
    let expectedUserID = null;
    const statusMessage1 = "this is a newly created test status 1";
    const statusMessage2 = "this is a newly created test status 2";
    const statusMessage3 = "this is a newly created test status 3";

    signup(testEmail, testAlias, testPassword, () => {}).then(res => {
        expectedUserID = res;
        const user = getUser(expectedUserID!);
        expect(user!.getEmail()).toEqual(testEmail);
        expect(user!.getAlias()).toEqual(testAlias);
        expect(user!.getPassword()).toEqual(testPassword);

        const preStatusCount = user?.getStatuses().length;
        createStatus(expectedUserID!, statusMessage1);
        createStatus(expectedUserID!, statusMessage2);
        createStatus(expectedUserID!, statusMessage3);
        const postStatusCount = user?.getStatuses().length;

        expect(preStatusCount).toBeLessThan(postStatusCount!);
        expect(buildFeed(expectedUserID!, 2)!.length).toEqual(2);
        expect(buildFeed(expectedUserID!, 5)!.length).toEqual(3);
    });
})