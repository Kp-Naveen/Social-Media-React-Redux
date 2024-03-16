
import { useSelector } from 'react-redux'
import { selectPostIds,getPostsError,getPostsStatus} from './postsSlice'
import PostsExcept from './PostsExcept'


const PostsList = () => {
    
    const postsbyIds = useSelector(selectPostIds)              //(state)=> state.posts  //duddu 2:10:00
    const postStatus = useSelector(getPostsStatus) 
    const Error = useSelector(getPostsError)

    // useEffect(()=>{
    //   if( postStatus=== 'idle'){
    //     dispatch(fetchPost())
    //   }
    // },[postStatus, dispatch])

    let content;
    if(postStatus === 'Loading') {
      content = <p>"Loading...."</p>

    }
    else if (postStatus === 'successed'){
    //const orderedPosts = posts.slice().sort((a, b)=> b.date.localeCompare(a.date))  // reverse
    content = postsbyIds.map(postId =>
          <PostsExcept key={postId} postId={postId}  />)
    }else if (postStatus === 'failed'){
      content = <p> {Error}</p>
    }

  return (
   <section>
     <h2>Posts ({postsbyIds.length})</h2>
     {content}
   </section>
  )
}

export default PostsList
