import { signup, signin } from '../auth'
import { getUser } from '../../API'

it("handles signup correctly", () => {
    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";
    let expectedUserID = null;

    signup(testEmail, testAlias, testPassword, () => {}).then(res => {
        expectedUserID = res;
        const user = getUser(expectedUserID!);
        expect(user!.getEmail()).toEqual(testEmail);
        expect(user!.getAlias()).toEqual(testAlias);
        expect(user!.getPassword()).toEqual(testPassword);
    })
});

it("handles signin correctly", () => {

    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";
    let expectedUserIDSignup = null;
    let expectedUserIDSignin = null;

    signup(testEmail, testAlias, testPassword, () => {}).then(res => {
        expectedUserIDSignup = res;
        const user = getUser(expectedUserIDSignup!);
        expect(user!.getEmail()).toEqual(testEmail);
        expect(user!.getAlias()).toEqual(testAlias);
        expect(user!.getPassword()).toEqual(testPassword);
    })

    signin(testAlias, testPassword, () => {}).then(res => {
        expectedUserIDSignin = res;
        expect(testAlias).toEqual(expectedUserIDSignin);
    })
});

it("handles signin error correctly", () => {
    const testBadAlias = "bad";
    const testBadPassword = "bad";

    let expectedUserIDSignin = null;

    signin(testBadAlias, testBadPassword, () => {}).then(res => {
        expectedUserIDSignin = res;
        expect(expectedUserIDSignin).toEqual(null);
    })
});
