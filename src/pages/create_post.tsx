import Layout from '@/app/layout'
import PostCard from '@/components/PostCard'
import { Context } from '@/context/Context'
import { IPost } from '@/models/IPost'
import PostService from '@/services/PostService'
import React, { useContext, useEffect, useState } from 'react'

const create_post = () => {
  const { user } = useContext(Context)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (user) {
      PostService.getUserPosts(user.id).then((data) => setPosts(data))
    }
  }, [user])

  return (
    <Layout>
      {posts.length !== 0 ? (
        posts.map((post: IPost) => (
          <PostCard body={post.body} user={user} post={post.id} key={post.id} />
        ))
      ) : (
        <h1>No posts</h1>
      )}
    </Layout>
  )
}

export default create_post
