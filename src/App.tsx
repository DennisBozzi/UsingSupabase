import Home from './screens/home'
import Login from './screens/login'
import Storage from './screens/storage'
import Layout from './components/layout'
import { Toaster } from 'sonner'
import { useAuth } from '@/hooks/authProvider'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { TooltipProvider } from '@radix-ui/react-tooltip'

//TODO: Change supabase url to -> https://usingsupabase.onrender.com
//TODO: Create reusables settings and logout dialog
//TODO: Create a sheet menu navigation

export default function App() {
  const session = useAuth()

  return (
    <Router>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={!session ? <Login /> : <Navigate to="/home" />} />
          <Route path="/home" element={session ? <Layout><Home /></Layout> : <Navigate to="/" />} />
          <Route path="/storage" element={session ? <Layout><Storage /></Layout> : <Navigate to="/" />} />
        </Routes>
      </TooltipProvider>
      <Toaster />
    </Router>
  )

}