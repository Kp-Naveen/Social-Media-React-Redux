import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import { Routes, Route, Navigate } from "react-router-dom";
import SinglePost from "./features/posts/SinglePost";
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/EditPostForm";
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";


function App() {
    return (
    <Routes>
        <Route path="/" element={<Layout />}>
             <Route index element={<PostsList />} />

             <Route path ="post">
                <Route index element={<AddPostForm />} />
                <Route path=":postId" element={<SinglePost />} />
                <Route path="edit/:postId" element ={<EditPostForm />} />
             </Route>
             <Route path ="user">
                <Route index element={<UserList />} />
                <Route path=":userId" element={<UserPage/>} />

                <Route path="*" element ={<Navigate to="/" replace />} />
             </Route>

        </Route>
    </Routes>
    )
}

export default App;
