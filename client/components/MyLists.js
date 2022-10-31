import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ListIcon from '@mui/icons-material/List'

import { useQuery } from 'app-shared/client/hooks/cqrpc'
import Link from 'app-shared/client/components/Link'
import LoadingList from 'app-shared/client/components/LoadingList'
import Timestamp from 'app-shared/client/components/Timestamp'
import ButtonRow from 'app-shared/client/components/ButtonRow'

export default function MyLists({...props}) {
  const query = useQuery('lists.getAll')
  console.log(query)
  const lists = query.result?.lists || []
  return <>
    <LoadingList {...{
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
      members: lists && lists.map(list => ({
        key: list.id,
        href: `/lists/${list.id}`,
        icon: <ListIcon />,
        text: list.name,
        subtext: <>
          last updated: <Timestamp at={list.createdAt}/>
        </>,
      }))
    }}/>
    <ButtonRow>
      <Button
        variant="contained"
        component={Link}
        to="/lists/new"
      >New List</Button>
    </ButtonRow>
  </>
}
