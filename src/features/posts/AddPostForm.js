import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { postAdded } from './postsSlice'
import {addNewPost} from './postsSlice'
import { selectAllusers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch(); ///action
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const toSetTitle = (e)=> setTitle(e.target.value)
    const toSetContent= (e)=>setContent(e.target.value)

    const [userId, setUserId] = useState('')
    const users = useSelector(selectAllusers)
    const toSetId= (e)=>setUserId(e.target.value)
    const [addRequest, setAddRequest] = useState('idle')
    const toSave = [title, content, userId].every(Boolean) && addRequest === "idle"
    
    const onSavePost= ()=>{
        if(toSave){
            try{
                setAddRequest('pending')
            dispatch(addNewPost({title, body: content, userId})
            ).unwrap()

            setContent('')
            setTitle('')
            navigator('/')
            }
            catch(err){
                console.error('requst will be failed : ', err)
            }
            finally{
                setAddRequest('idle')
            }
        }
    }
    const usersOption = users.map(user=>(
        <option key={user.id}
         value={user.id} >
            {user.name}
            
        </option>
        
    ))

  return (
   <section>
    <h2>Add a New Post</h2>
    <form>
        <label htmlFor="postTitle">title:</label>
        <input type="text" 
        id= "postTitle"
        value={title}
        onChange={toSetTitle}
       
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor"
        value={userId}
        onChange={toSetId}
        >
        <option value=""></option>
        {usersOption}
        </select>
        <label htmlFor="postContnet">Content:</label>
        <textarea type="text" 
        id= "postContent"
        value={content}
        onChange={toSetContent}
        />
        <button type="button" 
        onClick={onSavePost}
        disabled= {!toSave}
        >
            Save Post
        </button>
    </form>
   </section>
  )
}

export default AddPostForm
