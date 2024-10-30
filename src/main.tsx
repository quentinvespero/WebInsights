import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import './style/globalRules.css'
import './style/variables.css'
import { ContextProvider } from './components/context/ContextProvider.tsx'
import { ApiContextProvider } from './components/context/ApiContextProvider.tsx'
// import ContextProvider from './components/ContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <ContextProvider>
                <ApiContextProvider>
                    <App/>
                </ApiContextProvider>
            </ContextProvider>
        </HashRouter>
    </StrictMode>,
)