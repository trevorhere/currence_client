import ServerFacade  from '../API/ServerFacade'

const signup = async (email:string, alias:string, password:string, setAuthenticatedUserIDCallback): Promise<string | null> => {
   return await ServerFacade.signup(email, alias, password).then( res => {
        setAuthenticatedUserIDCallback(res);
        return res;
    }).catch(err => {
        // console.log(err);
        return null
    })
}

const signin =  async (alias:string, password:string, setAuthenticatedUserIDCallback): Promise<string | null> => {
    return await ServerFacade.signin(alias, password).then( res => {
        setAuthenticatedUserIDCallback(res);
        return res;
    }).catch(err => {
        // console.log(err);
        return null;
    })
}

const signout = async (setAuthenticatedUserIDCallback): Promise<void> => {
    
    setAuthenticatedUserIDCallback(null);
    return await ServerFacade.signout();

}

export { signup, signin, signout}