import { useRef, useLayoutEffect } from 'react'
import * as colors from '@mui/material/colors'
import Box from '@mui/material/Box'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


import { useQuery } from 'app-shared/client/hooks/cqrpc'
import LoadingList from 'app-shared/client/components/LoadingList'
import Timestamp from 'app-shared/client/components/Timestamp'

export default function MyLists({...props}) {
  const query = useQuery('lists.getAll')
  const lists = query.result?.lists || []
  return <LoadingList {...{
    ...props,
    loading,
    emptyMessage: `you dont have any lists`,
    members: lists && lists.map(n => ({
      key: n.id,
      href: `/login-attempts/${n.loginAttemptId}`,
      icon: <NotificationsActiveIcon />,
      text: `Attempt to login to ${n.host}`,
      subtext: <Timestamp at={n.createdAt}/>,
    }))
  }}/>
}
