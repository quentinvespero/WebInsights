import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { GlobalContext } from '../components/context/ContextProvider'
import { it, expect, describe } from 'vitest'
import { ApiKeyContext } from '../components/context/ApiKeyContextProvider'

const contentForTesting = {
    en: {
        pages: [
            { id: 'summary', text: 'Summary Page', icon: 'summary-icon' }
        ],
        popupMessages: {
            apiKeyEmpty: 'API key is required',
        }
    }
}

const renderApp = (language = '', apiKeyState = '', route = '/') => {
    
    // Derive partialApiKey from apiKeyState, as in ApiContextProvider
    const partialApiKey = apiKeyState ? `***${apiKeyState.slice(-5)}` : ''

    // GlobalContext properties, including setLanguage
    const globalContextValues = {
        language,
        setLanguage: () => {},
        promptId: 0,
        setPromptId: () => 0,
        savingSetting: () => {},
        savingSettingV2: () => {},
        languageV2: 0,
        setLanguageV2: () => {}
    }

    const apiContextValues = {
        apiKeyState,
        partialApiKey,
        settingUpApiKey: () => {},
        isValidApiKey:() => false,
        loadingApiKey:true
    }

    return render(
        <GlobalContext.Provider value={globalContextValues}>
            <ApiKeyContext.Provider value={apiContextValues}>
                <MemoryRouter initialEntries={[route]}>
                    <App />
                </MemoryRouter>
            </ApiKeyContext.Provider>
        </GlobalContext.Provider>
    )
}

describe('App Component', () => {

    it('navigates to the summary route by default when an unknown route is accessed', () => {
        renderApp('en', '12345', '/unknown-route')
        expect(screen.getByText(contentForTesting.en.pages[0].text)).toBeInTheDocument()
    })
})