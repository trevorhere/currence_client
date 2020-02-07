import { createContext} from "react";

export const authContext = createContext({
    authenticatedUserID:null, 
    setAuthenticatedUserID: null
});