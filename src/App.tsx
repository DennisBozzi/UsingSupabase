import Home from './screens/home';
import Login from './screens/login';
import { Toaster } from 'sonner';
import { useAuth } from '@/hooks/authProvider'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

export default function App() {
  const session = useAuth()

  const router = createBrowserRouter([
    {
      path: "/*", element: (!session ? <Login /> : <Navigate to="/home" />)
    },
    {
      path: "/Home", element: (session ? <Home /> : <Navigate to="/" />)
    },
  ]);

  return (
    <>
      < RouterProvider router={router} >
      </RouterProvider>
      <Toaster />
    </>
  )


}