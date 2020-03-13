import React, { createContext} from "react";

type authProps = {
    authenticationToken: {token: string, alias: string} | null;
    setAuthenticationToken: React.Dispatch<React.SetStateAction<null>>
 }

export const authContext = createContext<Partial<authProps>>({});