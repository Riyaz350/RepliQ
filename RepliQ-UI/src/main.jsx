import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from './Layout/Home.jsx';
import Register from './Authentication/Register.jsx';
import LogIn from './Authentication/LogIn.jsx';
import AuthProvider from './Authentication/Authprovider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/logIn",
        element:<LogIn/>
      },
    ],
  },
  {
    path:'register',
    element:<Register/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
