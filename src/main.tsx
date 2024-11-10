import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import './style/globalRules.css'
import './style/variables.css'
import { ContextProvider } from './components/context/ContextProvider.tsx'
import { ApiContextProvider } from './components/context/ApiContextProvider.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import FallbackError from './components/fallbackComponents/FallbackError.tsx'
import FallbackLoading from './components/fallbackComponents/FallbackLoading.tsx'
import { AppContentProvider } from './components/context/AppContentContextProvider.tsx'
import { PromptProvider } from './components/context/PromptContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary fallback={<FallbackError/>}>
            <Suspense fallback={<FallbackLoading/>}>
                <HashRouter>
                    <AppContentProvider>
                        <PromptProvider>
                            <ApiContextProvider>
                                <ContextProvider>
                                    <App/>
                                </ContextProvider>
                            </ApiContextProvider>
                        </PromptProvider>
                    </AppContentProvider>
                </HashRouter>
            </Suspense>
        </ErrorBoundary>
    </StrictMode>,
)