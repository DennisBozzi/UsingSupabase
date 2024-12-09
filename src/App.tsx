import Home from './screens/home'
import Login from './screens/login'
import Storage from './screens/storage'
import Layout from './components/layout'
import { Toaster } from 'sonner'
import { useAuth } from '@/hooks/authProvider'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { TooltipProvider } from '@radix-ui/react-tooltip'

//TODO: Change supabase url to -> https://usingsupabase.onrender.com
//TODO: Create reusables settings and logout dialog

export default function App() {
  const session = useAuth()

  const router = createBrowserRouter([
    {
      path: "/*", element: (!session ? <Login /> : <Navigate to="/home" />)
    },
    {
      path: "/home", element: (session ? <Layout children={<Home />} /> : <Navigate to="/" />)
    },
    {
      path: "/storage", element: (session ? <Layout children={<Storage />} /> : <Navigate to="/" />)
    },
  ]);

  return (
    <>
      <TooltipProvider>
        < RouterProvider router={router} >
        </RouterProvider>
      </TooltipProvider>
      <Toaster />
    </>
  )

}