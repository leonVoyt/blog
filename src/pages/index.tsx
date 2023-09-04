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
import PostService from '@/services/PostService'

const index = () => {
  const [posts, setPosts] = useState<any>([])
  const { data: users } = useAllUsers()

  const { user } = useContext(Context)
  console.log(user)
  useEffect(() => {
    PostService.getAllPosts().then((data) => setPosts(data))
  }, [])

  return (
    <Layout>
      <CreatePost />
      {posts?.length && users?.length ? (
        posts.map((post: IPost) => (
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
