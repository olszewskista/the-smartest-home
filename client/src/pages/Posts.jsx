import { useEffect, useState } from 'react';
import DisplayPosts from '../components/DisplayPosts';
import NewPostForm from '../components/NewPostForm';

export default function PostsPage() {
    const [fetchHelper, setFetchHelper] = useState(false);
    const [params, setParams] = useState({ key: 'title', value: '' });
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            let url = '/api/posts'
            if (params.value !== '') {
                url += `?key=${params.key}&value=${params.value}`
            }
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
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-center text-3xl uppercase font-bold'>Posts</h1>
            <div className='my-4'>
                <input
                    type="text"
                    value={params.value}
                    placeholder='Search'
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
            </div>
            <NewPostForm setHelper={setFetchHelper} />
            <DisplayPosts posts={posts} setHelper={setFetchHelper} />
        </div>
    );
}
