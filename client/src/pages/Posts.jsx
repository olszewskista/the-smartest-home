import { useEffect, useState } from 'react';
import DisplayPosts from '../components/DisplayPosts';
import NewPostForm from '../components/NewPostForm';

export default function PostsPage() {
    const [fetchHelper, setFetchHelper] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            try {
                const response = await fetch('http://localhost:3000/posts/', {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, [fetchHelper])
    return (
        <div>
            <h1>Posts</h1>
            <NewPostForm setHelper={setFetchHelper}/>
            <DisplayPosts posts={posts} setHelper={setFetchHelper}/>
        </div>
    );
}
