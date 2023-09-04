import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../config/theme'
import createEmotionCache from '../config/createEmotionCache'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Context } from '@/context/Context'
import { IUser } from '@/models/IUser'
import { useAllUsers } from '@/hooks/useAllUsers'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const [user, setUser] = React.useState<any>(null)
  React.useEffect(() => {
    if (localStorage.getItem('user')) {
      let user = localStorage.getItem('user')
      if (user) {
        let currUser: IUser = JSON.parse(user)
        setUser(currUser)
      }
    }
  }, [])
  const [queryClient] = React.useState(() => new QueryClient())

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <Context.Provider value={{ user }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </Context.Provider>
  )
}
