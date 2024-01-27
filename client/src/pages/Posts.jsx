import { useEffect, useState } from 'react';
import DisplayPosts from '../components/DisplayPosts';
import NewPostForm from '../components/NewPostForm';

export default function PostsPage() {
    const [fetchHelper, setFetchHelper] = useState(false);
    const [params, setParams] = useState({ key: 'title', value: '' });
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            let url = 'http://localhost:3000/posts'
            if (params.value !== '') {
                url += `?key=${params.key}&value=${params.value}`
            }
            console.log(url)
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPosts();
    }, [fetchHelper, params]);
    console.log(params)
    return (
        <div>
            <h1>Posts</h1>
            <div>
                <label htmlFor="serach">Search</label>
                <input
                    type="text"
                    value={params.value}
                    onChange={(e) =>
                        setParams((prev) => ({
                            ...prev,
                            value: e.target.value,
                        }))
                    }
                />
                <select
                    name=""
                    id=""
                    onChange={(e) =>
                        setParams((prev) => ({ ...prev, key: e.target.value }))
                    }
                >
                    <option value="title">Title</option>
                    <option value="content">Content</option>
                    <option value="author">Author</option>
                </select>
                <button onClick={() => setFetchHelper(prev => !prev)}>Search</button>
            </div>
            <NewPostForm setHelper={setFetchHelper} />
            <DisplayPosts posts={posts} setHelper={setFetchHelper} />
        </div>
    );
}
