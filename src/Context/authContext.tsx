import { createContext, Dispatch, SetStateAction } from "react";

export const authContext = createContext({authenticatedUserID: null});