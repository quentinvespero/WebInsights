import { createContext } from "react";
import { LanguageProps, PromptsProps } from "../../interfaces/globalProps";

interface AppContextProps {
    language:LanguageProps['language']
    setLanguage:LanguageProps['setLanguage']
    promptId:PromptsProps['promptId']
    setPromptId:PromptsProps['setPromptId']
}

export const AppContext = createContext<AppContextProps>