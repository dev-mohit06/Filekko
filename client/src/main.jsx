import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './common/router'
import { QueryProvider } from './common/query-service'
import { UserContextProvider } from './common/context'

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <QueryProvider>
            <RouterProvider router={routes} />     
        </QueryProvider>
    </UserContextProvider>
)