import { Dispatch, SetStateAction } from "react";
import { AppContentInterface } from "./appContentInterfaces";

export interface AppContentProps {
    appContent:AppContentInterface
}

export interface LanguageProps {
    setLanguage: Dispatch<SetStateAction<"fr" | "en">>
    language?: 'fr'|'en'
}