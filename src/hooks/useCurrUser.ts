import { IUser } from '@/models/IUser'
import UserService from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'

export const useCurrUser = (user: string) => {
  return useQuery(['user'], () => {
    return UserService.getCurrUser(user)
  })
}
