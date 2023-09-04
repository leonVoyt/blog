import { IUser } from '@/models/IUser'
import supabase from '../../supabase'

class UserService {
  async getCurrUser(emails: string): Promise<IUser | null> {
    if (emails !== '') {
      let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', emails)
      if (!users) {
        return null
      }
      return users[0]
    } else {
      return null
    }
  }
  async getAllUsers(): Promise<IUser[] | null> {
    let { data: users, error } = await supabase.from('users').select('*')

    return users
  }
}
export default new UserService()
