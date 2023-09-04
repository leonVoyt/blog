import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DisabledPortalPopup from './Modal/CreateComent'
import { IUser } from '@/models/IUser'
import CreateComent from './Modal/CreateComent'
import { useRouter } from 'next/router'
import { Context } from '@/context/Context'
import { useAllUsers } from '@/hooks/useAllUsers'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)
interface CommentCardProps {
  body: string
  postId: number
  userId: number
}

const CommentCard: React.FC<CommentCardProps> = ({ body, postId, userId }) => {
  const { data } = useAllUsers()

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 4,
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          display: 'block',
          flexDirection: '',
          width: '100%',
          justifyContent: 'center',
          msFlexDirection: 'column',
        }}
      >
        <Typography variant="h6" component="div" sx={{ textAlign: 'end' }}>
          Author :{' '}
          <strong>{data?.find((user) => user.id === userId)?.email}</strong>
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{
            display: 'block',
            m: '2rem 0',
            width: '100%',
            textAlign: 'start',
          }}
        >
          Comment : {body}
        </Typography>
      </CardContent>

      <CardActions
      // sx={{ display: 'flex', flex: '0 0 20%', flexDirection: 'column' }}
      ></CardActions>
    </Card>
  )
}
export default CommentCard
