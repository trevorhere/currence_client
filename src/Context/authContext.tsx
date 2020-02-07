import { createContext, Dispatch, SetStateAction } from "react";

export const authContext = createContext({authenticatedUserId: null});