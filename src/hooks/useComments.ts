import { IUser } from '@/models/IUser'
import CommentService from '@/services/CommentService'
import UserService from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'

export const useCurrComment = (id: string) => {
  return useQuery(['comments'], () => {
    return CommentService.getAllComments(id)
  })
}
