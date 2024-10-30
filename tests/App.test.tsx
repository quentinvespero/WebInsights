import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom'
import App from '../App'
import { ContextProvider, GlobalContext } from '../components/context/ContextProvider'
import { it, expect, describe } from 'vitest'

// Simplified mock content
const mockContent = {
    en: {
        title: 'App Title',
        pages: [
            { id: 'summary', text: 'Summary Page', icon: 'summary-icon' }
        ],
        popupMessages: {
            apiKeyEmpty: 'API key is required',
        }
    }
}

// Mocking ApiContext values
const renderApp = (language = 'en', apiKeyState = '', route = '/') => {
    // Derive partialApiKey from apiKeyState, as in ApiContextProvider
    const partialApiKey = apiKeyState ? `***${apiKeyState.slice(-5)}` : ''

    return render(
        <GlobalContext.Provider value={{ language }}>
            <ApiContext.Provider value={{
                apiKeyState,
                partialApiKey,
                settingUpApiKey: () => {} // Placeholder function for tests
            }}>
                <HashRouter initialEntries={[route]}>
                    <App />
                </HashRouter>
            </ApiContext.Provider>
        </GlobalContext.Provider>
    )
}

describe('App Component', () => {

    it('renders without crashing', () => {
        renderApp()
        expect(screen.getByText(mockContent.en.title)).toBeInTheDocument()
    })

    it('renders the popup message when partialApiKey is too short', () => {
        renderApp('en', '12')  // Short API key triggers popup
        expect(screen.getByText(mockContent.en.popupMessages.apiKeyEmpty)).toBeInTheDocument()
    })

    it('navigates to the summary route by default when an unknown route is accessed', () => {
        renderApp('en', '12345', '/unknown-route')
        expect(screen.getByText(mockContent.en.pages[0].text)).toBeInTheDocument()
    })

})
