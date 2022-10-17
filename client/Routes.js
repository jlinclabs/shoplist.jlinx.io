import { Routes as _Routes, Route } from 'react-router-dom'

import { useCurrentUser } from 'app-shared/client/hooks/auth'
// import { RedirectToLoginDestination } from 'app-shared/client/pages/AuthPage'
import DebugPage from 'app-shared/client/pages/DebugPage'
import NotFoundPage from 'app-shared/client/pages/NotFoundPage'
import RedirectPage from 'app-shared/client/pages/RedirectPage'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AuthPage from './pages/AuthPage'
import ListsPage from './pages/ListsPage'

export default function Routes(){
  const { currentUser, loading, error } = useCurrentUser()
  const props = { currentUser }
  return <Layout {...{...props, loading, error}}>
    <_Routes>
      <Route path="/debug/*" element={<DebugPage {...{...props, appName: 'ShopList'}}/>}/>
      <Route path="/" element={<HomePage {...props}/>} />
      <Route path="/auth/*" element={<AuthPage {...props}/>} />
      <Route path="/about" element={<AboutPage {...props}/>} />
      {currentUser
        // logged in
        ? <>
          {/*<Route path="/login" element={<RedirectToLoginDestination/>} />*/}
          {/*<Route path="/signup" element={<RedirectToLoginDestination/>} />*/}
          <Route path="/lists/*" element={<ListsPage {...props}/>} />
          <Route path="*" element={<NotFoundPage {...props}/>}/>
        </>
        // not logged in
        : <>
          {/*<Route path="/login" element={<RedirectToLoginDestination/>} />*/}
          {/*<Route path="/signup" element={<RedirectToLoginDestination/>} />*/}
          {/*<Route path="/reset-password" element={<RedirectToLoginDestination/>} />*/}
          <Route path="*" element={<RedirectToAuthPage/>} />
        </>
      }

    </_Routes>
  </Layout>
}


function RedirectToAuthPage({...props}){
  const loginDestination = location.toString().split(location.origin)[1]
  props.to = `/auth?d=${encodeURIComponent(loginDestination)}`
  console.log('<RedirectToAuthPage/>', props.to)
  return <RedirectPage {...props}/>
}