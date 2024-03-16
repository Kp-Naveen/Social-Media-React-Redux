import React from 'react'                                        // npm i react-router-dom
import { selectAllPostsById } from './postsSlice'
import {  useSelector } from 'react-redux'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link, useParams } from 'react-router-dom'

const SinglePost = () => {
    const {postId} = useParams()

    const post = useSelector((state)=> selectAllPostsById(state, Number(postId)))

    if(!post){
        return(
            <section>
                <h2>Post Not Found</h2>
            </section>
        )
    }
  return (
    <section>
    <h2>Post:  {post.id}</h2>
    <article>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <div className='postcredit'>
        <Link to={`/post/edit/${post.id}`} style={{textDecoration:"none"}} >Edit post</Link>
        <PostAuthor userId= {post.userId} />
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post={post} />
    </div>
</article>
</section>
  )
}

export default SinglePost
