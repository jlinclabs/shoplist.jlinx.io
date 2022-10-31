import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { useQuery } from 'app-shared/client/hooks/cqrpc'
import Link from 'app-shared/client/components/Link'
import LoadingList from 'app-shared/client/components/LoadingList'
import Timestamp from 'app-shared/client/components/Timestamp'

export default function MyLists({...props}) {
  const query = useQuery('lists.getAll')
  const lists = query.result?.lists || []
  return <LoadingList {...{
    ...props,
    loading: query.loading,
    error: query.error,
    emptyMessage: <Box>
      <Typography>you dont have any lists yet :O</Typography>
      <Button
        sx={{mt: 2}}
        variant="contained"
        component={Link}
        to="/lists/new"
      >Create Your First List</Button>
    </Box>,
    members: lists && lists.map(n => ({
      key: n.id,
      href: `/login-attempts/${n.loginAttemptId}`,
      icon: <NotificationsActiveIcon />,
      text: `Attempt to login to ${n.host}`,
      subtext: <Timestamp at={n.createdAt}/>,
    }))
  }}/>
}
