import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const URL= 'https://jsonplaceholder.typicode.com/posts'

const postAdapter = createEntityAdapter({
    sortComparer :(a, b)=> b.date.localeCompare(a.date)})
const initialState = postAdapter.getInitialState({
   // post=[], 
    status: 'idle',   // loading, success, failed
    error: null,
    count:0
})

export const fetchPost=createAsyncThunk('posts/fetchPosts', async ()=>{
    const response = await axios.get(URL)
    return response.data
})

export const addNewPost = createAsyncThunk(' posts, fetchPosts', async (initialPost)=>{
    const response = await axios.post(URL, initialPost)
    return response.data
    
})
export const editPost = createAsyncThunk('posts/editPost', async(initialPost)=>{
    const {id} = initialPost;
    try{
        const response = await axios.put(`${URL}/${id}`, initialPost)
        return response.data
    }
    catch(err){
        return initialPost// err.message
    }
})
export const deletePost = createAsyncThunk('posts/deletePost', async(initialPost)=>{
    const {id} = initialPost;
    try{
        const response = await axios.delete(`${URL}/${id}`)
        if(response.status === 200) return initialPost;
        return `${response.status} : ${response.statusText}`;
    }
    catch(err){
        return err.message
    }
})
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // postAdded:{
        //     reducer(state, action){
        //         state.posts.push(action.payload)
        //     }, 
        //     prepare(title,body, userId){
        //      return {
        //         payload:{
        //             id: nanoid(),
        //             title, 
        //             body, 
        //             date: new Date().toISOString(),
        //             userId, 
        //             reactions:{
        //                 thumbsUp: 0,
        //                 wow: 0,
        //                 heart: 0,
        //                 rocket:0,
        //                 coffee:0
        //             }
                
        //             }
        //      }
        //   }
        //},
        increaseCount(state, action){
            state.count = state.count+ 1

        },
        reactionAdded(state, action){
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        }

    },
    extraReducers(builder){   // for promise from asyntrunk
            builder.addCase(fetchPost.pending, (state, action)=>{
                state.status= 'loading'  ///initalState --> status
            })
            builder.addCase(fetchPost.fulfilled, (state, action)=>{
                state.status= 'successed'
                //adding date and recation
                let min=1;
                const loadedPosts= action.payload.map(post=>{

                    post.date = sub(new Date(),{minutes: min++}).toISOString()
                    post.reactions ={
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket:0,
                        coffee:0
                    }
                    return post;
                });
               // state.posts = state.posts.concat(loadedPosts)
               postAdapter.upsertMany(state, loadedPosts)

            })
            builder.addCase(fetchPost.rejected, (state, action)=>{
                state.status ='failed'
                state.error= action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const newPost = {
                    ...action.payload,
                    id: state.ids.length > 0 ? Math.max(...state.ids) + 1 : 1,
                    userId: Number(action.payload.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                };
                postAdapter.addOne(state, newPost);
            })
            .addCase(editPost.fulfilled, (state, action)=>{
                if(!action.payload.id){
                    console.log('Update could not complte')
                    console.log(action.payload)
                    return;
                }
                // const {id} = action.payload;
                 action.payload.date = new Date().toISOString()
                // const posts = state.posts.filter(post=> post.id !== id);
                // state.posts = [...posts, action.payload]
                postAdapter.upsertOne(state, action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action)=>{
                if(!action.payload.id){
                    console.log('Delete could not complte')
                    console.log(action.payload)
                    return;
                }
                const {id} = action.payload;
                // const posts = state.posts.filter(post=> post.id !== id);
                // state.posts = posts
                postAdapter.removeOne(state, id)
            })
    }
})

export const {
    selectAll : selectAllPosts, selectById: selectAllPostsById, selectIds : selectPostIds
} = postAdapter.getSelectors(state=> state.posts)
//export const selectAllPosts = (state)=> state.posts.posts
export const getPostsStatus = (state)=> state.posts.status
export const getPostsError = (state)=> state.posts.error
export const getCount = (state)=>state.posts.count
//export const selectAllPostsById = (state, postId) => state.posts.posts.find(post=> post.id === postId)

export const selectpostByuser = createSelector([selectAllPosts, (state,userId)=> userId],(posts, userId)=>posts.filter(post=> post.userId === userId))
export const {increaseCount, postAdded, reactionAdded} = postsSlice.actions
export default postsSlice.reducer