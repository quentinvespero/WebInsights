import { createContext, FC, ReactNode, useState } from "react"
import { LanguageProps, PromptsProps } from "../../interfaces/globalProps"

interface AppProviderProps {
    children:ReactNode
}

export const AppContext = createContext

const AppProvider: FC<AppProviderProps> = ({ children }) => {

    const [language, setLanguage] = useState<LanguageProps['language']>("en")
    
    const [promptId, setPromptId] = useState<PromptsProps['promptId']>(0)

    return (
        <div>
            {children}
        </div>
    )
}

export default AppProvider