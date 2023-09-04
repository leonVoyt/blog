import UserService from '@/services/UserService'
import { useQuery } from '@tanstack/react-query'

export const useAllUsers = () => {
  return useQuery(['users'], () => {
    return UserService.getAllUsers()
  })
}
