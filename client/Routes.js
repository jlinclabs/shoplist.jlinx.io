import { Routes as _Routes, Route } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

import { useCurrentUser } from 'app-shared/client/hooks/auth'
import AppError from 'app-shared/client/components/AppError'
import AuthPage from 'app-shared/client/pages/AuthPage'
import HomePage from './pages/HomePage'

export default function Routes({ children }){
  const { currentUser, loading, error } = useCurrentUser()
  if (loading) return <CircularProgress/>
  if (error) return <AppError {...{error}}/>
  if (currentUser) return <_Routes>
    <Route path="*" element={<AuthPage />} />
  </_Routes>
  const props = {
    currentUser,
  }
  return <_Routes>
    <Route path="/" element={<HomePage {...props}/>} />
    <Route path="/login" element={<div>login page</div>} />
    {children}
  </_Routes>
}

