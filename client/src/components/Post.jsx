import PropTypes from 'prop-types';
import { useState } from 'react';
import { useFormik } from 'formik';

export default function Post({ post, setHelper }) {
    const [editing, setEditing] = useState(false);
    const formik = useFormik({
        initialValues: {
            title: post.title,
            content: post.content,
        },
        onSubmit: async (values) => {
            try {
                const response = await fetch(
                    '/api/posts/' + post._id,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(values),
                    }
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setHelper((prev) => !prev);
                setEditing(false);
            } catch (error) {
                console.log(error);
            }
        },
    })
    async function handleDelete(id) {
        try {
            const response = await fetch('/api/posts/' + id, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setHelper((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='mb-2'>
            {!editing && (
                <div className='flex flex-col items-center gap-1 bg-neutral-200 shadow p-4 rounded w-96'>
                    <h3 className='capitalize font-bold text-xl'>{post.title}</h3>
                    <p>{post.content}</p>
                    <p className='flex justify-between gap-4'>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>- {post.author.name}</span>
                    </p>
                    <button className='bg-red-400 text-white rounded p-1' onClick={() => handleDelete(post._id)}>
                        Delete
                    </button>
                    <button className='bg-orange-300 p-1 rounded' onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
            {editing && (
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>
                    <input type="text" {...formik.getFieldProps('title')}/>
                    <textarea id="content" cols="30" rows="5" {...formik.getFieldProps('content')}></textarea>
                    <button className='bg-green-400 rounded' type='submit' onClick={formik.handleSubmit}>Save</button>
                </form>
            )}
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    setHelper: PropTypes.func.isRequired,
};
