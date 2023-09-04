import Layout from '@/app/layout'
import PostCard from '@/components/PostCard'
import React, { useContext, useEffect, useState } from 'react'

import { useAllPosts } from '@/hooks/usePosts'
import supabase from '../../supabase'
import { IPost } from '@/models/IPost'
import { useAllUsers } from '@/hooks/useAllUsers'
import { Button } from '@mui/material'
import CreatePost from '@/components/Modal/CreatePost'
import { IUser } from '@/models/IUser'
import { Context } from '@/context/Context'

const index = () => {
  const { data } = useAllPosts()
  const { data: users } = useAllUsers()
  // const [users, setUser] = useState<IUser>({})

  const { user } = useContext(Context)
  console.log(user)
  useEffect(() => {}, [data])
  // const { currUser } = useAppSelector((state: any) => state.currUserReducer)
  // const { setCurrUserSucess } = currUserSlice.actions
  // const dispatch = useAppDispatch()
  // console.log(currUser)
  // const get = async () => {
  //   let { data: posts, error } = await supabase.from('posts').select('*')

  //   await console.log(posts)
  // }

  return (
    <Layout>
      <CreatePost />
      {data?.length && users?.length ? (
        data.map((post: IPost) => (
          <PostCard
            body={post.body}
            key={post.id}
            user={users?.find((user) => user.id === post.authorId)}
            post={post.id}
          />
        ))
      ) : (
        <div>no posts</div>
      )}
    </Layout>
  )
}

export default index
