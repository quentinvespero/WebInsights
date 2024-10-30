import { ReactNode } from "react";
import { AppContentInterface } from "./appContentInterfaces";

export interface AppContentProps {
    appContent:AppContentInterface
}

export interface ContextProviderProps {
    children:ReactNode
}