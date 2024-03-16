import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllPostsById } from './postsSlice'
import {editPost, deletePost} from './postsSlice'
import { selectAllusers } from '../users/usersSlice'
const EditPostForm = () => {
    const {postId}= useParams()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const post = useSelector((state)=>(selectAllPostsById(state, Number(postId))))
    const users = useSelector(selectAllusers)

    const [title, setTitle] = useState(post?.title)
            const onSetTitle = (e)=> setTitle(e.target.value)
    const [body, setBody] = useState(post.body)
        const onSetBody = (e)=> setBody(e.target.value)
    const [userId, setUserId] = useState(post?.userId)
        const onSetUserId = (e)=> setUserId(e.target.value)
    const [request, setRequest] = useState('idle')

    const canSave = [title, body, userId].every(Boolean) && request=== 'idle'
    if(!post){
        return (
         <section>
         <h2>Post no found</h2>
         </section>
        )}
    const onEditPost = ()=>{
        if(canSave){
            try{
                setRequest('pending')
                dispatch(editPost({id : post.id, title, body, userId , reactions :post.reactions})).unwrap()

                setTitle('')
                setBody('')
                setUserId('')
                navigator(`/post/${postId}`)

            }catch(err){
                console.log(err)
            }
            finally{
                setRequest('idle')
            }
        }

    }
    const onDeletePost = ()=>{
        if(canSave){
            try{
                setRequest('pending')
                dispatch(deletePost({id: post.id})).unwrap()

                setTitle('')
                setBody('')
                setRequest('')
                navigator('/')

            }catch(err){
                console.log(err)
            }
            finally{
                setRequest('idle')
            }
        }

    }
    const optionButton = users.map(user=>(
        <option key={user.id}
         value={user.id} >
            {user.name}
            
        </option>
        
    ))

  return (
    <section>
    <h2>Edit a Post</h2>
    <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" 
        id= "postTitle"
        value={title}
        onChange={onSetTitle}
       
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor"
        value={userId}
        onChange={onSetUserId}
        >
            <option value="" ></option>
        {optionButton}
        </select>
        <label htmlFor="postContnet">Content:</label>
        <textarea type="text" 
        id= "postContent"
        value={body}
        onChange={onSetBody}
        />
        <button type="button" 
        onClick={onEditPost}
        disabled= {!canSave}
        >
            Save Post
        </button>
        <button type="button" className='deleteButton'
        onClick={onDeletePost}
        >
            delete Post
        </button>
    </form>
   </section>
  )
}

export default EditPostForm
