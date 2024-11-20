// main.jsx
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './common/router'
import { QueryProvider } from './common/query-service'

createRoot(document.getElementById('root')).render(
    <QueryProvider>
        <RouterProvider router={routes} />     
    </QueryProvider>
)