import React, { createContext} from "react";

type authProps = {
    authenticatedUserID: string | null;
    setAuthenticatedUserID: React.Dispatch<React.SetStateAction<null>>
 }

export const authContext = createContext<Partial<authProps>>({});