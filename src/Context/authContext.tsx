import { createContext} from "react";

interface IContextProps {
    authenticatedUserID: string;
    setAuthenticatedUserID: (authenticatedUserID: string) => void;
  }

export const authContext = createContext({} as IContextProps);