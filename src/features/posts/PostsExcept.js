import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllPostsById } from './postsSlice'


const PostsExcept = ({postId}) => {
  const post = useSelector(state => selectAllPostsById(state, postId))
  return (
    <article>
            <h3>{post.title}</h3>
            <p className='excerpt'>{post.body.substring(0, 75)}....</p>
            <p className='postCredit'>
                <Link to={`post/${post.id}`}style={{textDecoration:"none", color:'rgb(5, 12, 119)'}} >View post</Link>
                <PostAuthor userId= {post.userId} />
                <TimeAgo timestamp={post.date}/>
                <ReactionButtons post={post} />
            </p>
        </article>
  )
}
//PostsExcept = React.memo(PostsExcept)
export default PostsExcept
