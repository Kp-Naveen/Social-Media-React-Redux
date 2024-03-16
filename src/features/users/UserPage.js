import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import {  selectpostByuser } from '../posts/postsSlice'


const UserPage = () => {
    const {userId} = useParams()  // how we come
    const user = useSelector((state)=> selectUserById(state, Number(userId)))

    const postForUser = useSelector(state=> selectpostByuser(state, Number(userId)))
        
    const postTitle = postForUser.map(post=>(
        <li key={post.id}>
            <Link to={`/post/${post.id}`} style={{textDecoration:"none", color:"black"}}>{post.title}</Link>
        </li>
    ))

  return (
    <section className='section'>
        <h2  style={{color:"rgb(5, 12, 119"}}>{user.name}</h2>
        <ol>{postTitle}</ol>
    </section>
  )
}


export default UserPage
