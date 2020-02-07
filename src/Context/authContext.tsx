import React, { createContext} from "react";

export type Props = {
    authenticatedUserID: string | null;
    setAuthenticatedUserID: (authenticatedUserID: string | null) => void;
 }

export const authContext = createContext({} as Props);