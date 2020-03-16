
import ServerFacade  from '../API/ServerFacade'

const signup = async (alias:string, password:string, picture: string, setAuthToken):  Promise<{message: string, token: string |null} | null > => {
    return await ServerFacade.signup(alias, password ,picture).then(data => {
        const { message, alias, authenticated, token } = data!;

        if(authenticated){
            setAuthToken({message, alias, token});
            return {message: message, token:token};
        } else {
            setAuthToken(null);
            return {message, token: null};
        }

    }).catch(err => {
        console.log('error', err);
        return null;
    })
}

const signin =  async (alias:string, password:string, setAuthToken): Promise<{message: string, token: string |null} | null > => {
    return await ServerFacade.signin(alias, password).then(data => {
        const { message, alias, authenticated, token } = data!;

        if(authenticated){
            setAuthToken({message, alias, token});
            return {message: message, token:token};
        } else {
            setAuthToken(null);
            return {message, token: null};
        }

    }).catch(err => {
        console.log('error', err);
        return null;
    })
}

const signout = async (setAuthToken): Promise<void> => {
    setAuthToken(null);
}

export { signup, signin, signout}