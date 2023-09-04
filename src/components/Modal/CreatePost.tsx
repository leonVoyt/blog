import * as React from 'react'
import { Unstable_Popup as Popup, PopupProps } from '@mui/base/Unstable_Popup'
import { Box, styled, Theme } from '@mui/system'
import { TextField } from '@mui/material'
import supabase from '../../../supabase'
import { IUser } from '@/models/IUser'

export default function CreatePost() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        overflowY: 'auto',
        position: 'relative',
        padding: '40px',
        justifyContent: 'center',
      }}
    >
      <PopupWithTrigger id="popup-with-portal" buttonLabel="Add Post" />
    </Box>
  )
}

function PopupWithTrigger(props: PopupProps & { buttonLabel: string }) {
  const { id, buttonLabel, ...other } = props

  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget)
  }

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let userId = 0
    if (localStorage.getItem('user')) {
      let user = localStorage.getItem('user')
      if (user) {
        let { id }: IUser = JSON.parse(user)
        userId = id
      }
    }
    const data = await new FormData(event.currentTarget)
    await await supabase
      .from('posts')
      .insert([{ id: Date.now(), authorId: userId, body: data.get('body') }])
      .select()

    await setAnchor(anchor ? null : event.currentTarget)
  }
  const open = Boolean(anchor)

  return (
    <div>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        {buttonLabel}
      </Button>
      <StyledPopup id={id} open={open} anchor={anchor} {...other}>
        <PopupBody>
          {buttonLabel}
          <Box
            component="form"
            onSubmit={handleCreatePost}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="body"
              label="body"
              type="body"
              id="body"
              autoComplete="current-body"
            />

            <Button
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              // onClick={() => console.log('sda')}
            >
              Create
            </Button>
          </Box>
        </PopupBody>
      </StyledPopup>
    </div>
  )
}

const StyledPopup = styled(Popup)`
  z-index: 1;
`

const grey = {
  50: '#f6f8fa',
  200: '#d0d7de',
  500: '#6e7781',
  700: '#424a53',
  900: '#24292f',
}

const PopupBody = styled('div')(
  ({ theme }: { theme: Theme }) => `
  height: 250px;
  width:300px;
  display: flex;
  align-items: center;
  flex-direction:column;
  justify-content:space-around;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`
)

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
}

const Button = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
  }

  &:focus-visible {
    box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }
`
