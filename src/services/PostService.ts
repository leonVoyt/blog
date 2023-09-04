import { IUser } from '@/models/IUser'
import supabase from '../../supabase'
import { IPost } from '@/models/IPost'

class PostService {
  async getAllPosts(): Promise<IPost[] | null> {
    let { data: posts, error } = await supabase.from('posts').select('*')

    return posts
  }

  async getUserPosts(id: number): Promise<IPost[] | null> {
    let { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('authorId', id)

    return posts
  }
}
export default new PostService()
