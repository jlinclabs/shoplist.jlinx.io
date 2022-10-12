import { Routes as _Routes, Route } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

import { useCurrentUser } from 'app-shared/client/hooks/auth'
import AppError from 'app-shared/client/components/AppError'
import AuthPage from 'app-shared/client/pages/AuthPage'
import DebugPage from 'app-shared/client/pages/DebugPage'
import NotFoundPage from 'app-shared/client/pages/NotFoundPage'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import ListsPage from './pages/ListsPage'

export default function Routes(){
  const { currentUser, loading, error } = useCurrentUser()
  if (loading) return <CircularProgress/>
  if (error) return <AppError {...{error}}/>
  const props = { currentUser }
  return <Layout {...{...props, loading, error}}>
    <_Routes>
      <Route path="/debug/*" element={<DebugPage {...{...props, appName: 'ShopList'}}/>}/>
      <Route path="*" element={<AuthPage {...props}/>} />
      {currentUser
        // logged in routes
        ? <>
          <Route path="/" element={<HomePage {...props}/>} />,
          <Route path="/lists/*" element={<ListsPage {...props}/>} />,
        </>
        // logged out routes
        : <></>
      }
      <Route path="*" element={<NotFoundPage {...props}/>}/>
    </_Routes>
  </Layout>
}

