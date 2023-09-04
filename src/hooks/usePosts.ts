import { Context } from '@/context/Context'
import PostService from '@/services/PostService'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export const useAllPosts = () => {
  return useQuery(['posts'], () => {
    return PostService.getAllPosts()
  })
}

export const useUserPosts = (id: number) => {
  return useQuery(['posts_USer'], () => {
    return PostService.getUserPosts(id)
  })
}
