
import { signup, signin, signout } from '../auth'
import { getUser, addUser } from '../../API'

it("handles signup correctly", () => {
    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";

    signup(testEmail, testAlias, testPassword, () => {}).then(res => {
        const user = getUser(res!);
        expect(user!.getEmail()).toEqual(testEmail);
        expect(user!.getAlias()).toEqual(testAlias);
        expect(user!.getPassword()).toEqual(testPassword);
    }).catch(err => {console.log('ERROR: ', err)})
});

it("handles signin correctly", () => {
    const testEmail = "test@test.com";
    const testAlias = "testAlias";
    const testPassword = "testPassword";

    signup(testEmail, testAlias, testPassword, () => {}).then(res => {
        const user = getUser(res!);
        expect(user!.getEmail()).toEqual(testEmail);
        expect(user!.getAlias()).toEqual(testAlias);
        expect(user!.getPassword()).toEqual(testPassword);
    }).catch(err => {console.log('ERROR: ', err)})

    signin(testAlias, testPassword, () => {}).then(res => {
        expect(testAlias).toEqual(res!);
    }).catch(err => {console.log(err)})
});

it("handles signin error correctly", () => {
    const testBadAlias = "bad";
    const testBadPassword = "bad";

    signin(testBadAlias, testBadPassword, () => {}).then(res => {
        expect(res!).toEqual(null);
    }).catch(err => {console.log(err)})
});

it("handles signout properly", () => {
    signout(() => {}).then(res => {
        expect(res!).toEqual(null);
    }).catch(err => {console.log(err)})
});

