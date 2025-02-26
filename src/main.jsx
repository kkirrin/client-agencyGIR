import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.scss'
import App from './App.jsx'

import { Object } from './routes';

const router = createBrowserRouter([
  {
      path: "/",
      element: (
        <App />
      ),
    },
  {
      path: "/object/:id",
      element: (
          <Object />
      ),
    }
  ]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)