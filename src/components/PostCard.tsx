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

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)
interface PostCardProps {
  user: IUser | undefined
  body: string
  post: number
}

const PostCard: React.FC<PostCardProps> = ({ body, user, post }) => {
  const router = useRouter()

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
      }}
    >
      <CardContent
        sx={{ display: 'flex', flex: '0 0 20%', flexDirection: 'column' }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Author :
        </Typography>
        <Typography variant="h5" component="div">
          {user?.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Content :
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, width: '20%' }}
        onClick={() => router.push(`/post/${post}`)}
      >
        Viev Comments
      </Button>
      <CardActions
        sx={{ display: 'flex', flex: '0 0 20%', flexDirection: 'column' }}
      >
        <CreateComent post={post} />
      </CardActions>
    </Card>
  )
}
export default PostCard
