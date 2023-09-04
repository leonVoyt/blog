import Layout from '@/app/layout'
import CommentCard from '@/components/CommentCard'
import { useCurrComment } from '@/hooks/useComments'
import { IComment } from '@/models/IComment'
import CommentService from '@/services/CommentService'
import { Card, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import supabase from '../../../supabase'

const PostPage = () => {
  const router = useRouter()
  // console.log(router)
  const [comments, setComments] = useState([])
  const s = async (id: string) => {
    let { data, error } = await supabase
      .from('comment')
      .select('*')
      .eq('postId', id)

    return data
  }
  useEffect(() => {
    if (router.query.id !== undefined) {
      s(router.query.id).then((data) => setComments(data))
    }
  }, [router.isReady])
  console.log(comments)

  if (!router.isReady) {
    return <h1>loading</h1>
  } else {
    return (
      <Layout>
        <>
          <Typography variant="h3" component="div">
            Post # {router.query.id}
          </Typography>
          {comments.length !== 0 &&
            comments.map((comment: IComment) => (
              <CommentCard
                key={comment.id}
                body={comment.body}
                postId={comment.postId}
                userId={comment.userId}
              />
            ))}
        </>
      </Layout>
    )
  }
}

export default PostPage
