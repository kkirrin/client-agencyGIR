import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.scss'
import App from './App.jsx'

import { Dashboard, Login, Object, Register } from './routes';

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
  },
  {
    path: "/login",
    element: (
      <Login />
    ),
  },
  {
    path: "/register",
    element: (
      <Register />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Dashboard />
    ),
  },
]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)