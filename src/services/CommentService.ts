import { IUser } from '@/models/IUser'
import supabase from '../../supabase'
import { IPost } from '@/models/IPost'

class CommentService {
  async getAllComments(id: string): Promise<any[] | null> {
    let { data: posts, error } = await supabase
      .from('comment')
      .select('*')
      .eq('postId', id)

    return posts
  }
}
export default new CommentService()
