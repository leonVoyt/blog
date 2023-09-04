import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import DropDown from './DropDown'
import supabase from '../../supabase'
import { useRouter } from 'next/router'
import { useAllUsers } from '@/hooks/useAllUsers'
import { useCurrUser } from '@/hooks/useCurrUser'
import { IUser } from '@/models/IUser'
import { json } from 'stream/consumers'

const defaultTheme = createTheme()

export default function SignIn() {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  // const [userEmail, setUserEmail] = useState('')
  const { data: users } = useAllUsers()
  // const { data: user } = useCurrUser(userEmail)

  // const [users, setUsers] = useState([])
  // const { data: users } = useAllUser()
  // console.log(users)

  // useEffect(() => {
  //   if(users){

  //     setUsers(users)
  //   }
  // }, [])
  useEffect(() => {})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let obj: IUser = {
      email: '',
      id: 1,
      password: '',
      role: '',
    }
    const data = await new FormData(event.currentTarget)

    const isUnique = await users?.find((el) => {
      if (el.email === data.get('email')) {
        return el
      }
    })
    if (
      data.get('email') === '' ||
      data.get('password') === '' ||
      data.get('role') === ''
    ) {
      console.log(data.get('email'), data.get('password'), data.get('role'))

      return alert('don`t field form')
    } else if (isUnique === undefined) {
      obj.id = Date.now()
      obj.email = `${data.get('email')}`
      obj.password = `${data.get('password')}`
      obj.role = `${data.get('role')}`
      await supabase.from('users').insert([obj]).select('*')
      await console.log(obj)

      await localStorage.setItem('user', JSON.stringify(obj))
      return await router.push('/')
    } else {
      alert('Email already exist')
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = await new FormData(event.currentTarget)
    const user = await users?.find((el) => el.email === data.get('email'))
    if (
      user?.email === data.get('email') &&
      user?.password === data.get('password')
    ) {
      await localStorage.setItem('user', JSON.stringify(user))

      await router.push('/')
    } else {
      // console.log(
      //   data.get('email'),
      //   user?.email,
      //   data.get('password'),
      //   user?.paassword
      // )
      alert('Wrong password or email')
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign {!isAuth ? ' in' : ' up'}
          </Typography>
          <Box
            component="form"
            onSubmit={!isAuth ? handleSubmit : handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!isAuth && <DropDown />}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign {isAuth ? ' Up!' : ' In!'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => setIsAuth(!isAuth)}
                >
                  {!isAuth
                    ? "Don't have an account? Sign Up!"
                    : 'Do you have an account? Sign In!'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
