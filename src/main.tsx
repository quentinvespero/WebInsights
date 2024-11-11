import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import './style/globalRules.css'
import './style/variables.css'
import { ContextProvider } from './components/context/ContextProvider.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import FallbackError from './components/fallbackComponents/FallbackError.tsx'
import FallbackLoading from './components/fallbackComponents/FallbackLoading.tsx'
import { AppContentProvider } from './components/context/AppContentContextProvider.tsx'
import { PromptProvider } from './components/context/PromptContextProvider.tsx'
import { ApiKeyContextProvider } from './components/context/ApiKeyContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary fallback={<FallbackError/>}>
            <Suspense fallback={<FallbackLoading/>}>
                <HashRouter>
                    <AppContentProvider>
                        <ApiKeyContextProvider>
                            <PromptProvider>
                                <ContextProvider>
                                    <App/>
                                </ContextProvider>
                            </PromptProvider>
                        </ApiKeyContextProvider>
                    </AppContentProvider>
                </HashRouter>
            </Suspense>
        </ErrorBoundary>
    </StrictMode>,
)