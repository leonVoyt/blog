import SignIn from '@/components/SignIn'
import NavBar from '@/components/NavBar'
import React, { useEffect } from 'react'
import supabase from '../../supabase'
import { currUserSlice } from '@/store/reducers/currUserSlice'
import { useCurrUser } from '@/hooks/useCurrUser'
import { useAppDispatch, useAppSelector } from '@/store/storeHooks/useRedux'
const auth = () => {
  // useEffect(() => {
  //   handleAuth().then((data) => console.log(data))
  // }, [])
  return (
    <>
      <SignIn />
    </>
  )
}

export default auth
