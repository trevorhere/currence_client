import { createContext} from "react";

interface IContextProps {
    authenticatedUserID: string | null;
    setAuthenticatedUserID: (authenticatedUserID: string) => void;
}

export const authContext = createContext({authenticatedUserID: null, setAuthenticatedUserID: {}});