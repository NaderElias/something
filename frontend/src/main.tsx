// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import {ViewDepartment} from './pages/ViewDepartment'
import { ApolloProvider } from '@apollo/client/react'
import client from './apolloClient'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
 <ViewDepartment />
    </ApolloProvider>
  </StrictMode>,
)
