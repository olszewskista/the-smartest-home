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
                    'http://localhost:3000/posts/' + post._id,
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
            const response = await fetch('http://localhost:3000/posts/' + id, {
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
        <div>
            {!editing && (
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>
                        <span>{post.author.name} </span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                    </p>
                    <button onClick={() => handleDelete(post._id)}>
                        Delete
                    </button>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
            {editing && (
                <form onSubmit={formik.handleSubmit}>
                    <input type="text" {...formik.getFieldProps('title')}/>
                    <textarea id="content" cols="30" rows="10" {...formik.getFieldProps('content')}></textarea>
                    <button type='submit' onClick={formik.handleSubmit}>Save</button>
                </form>
            )}
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    setHelper: PropTypes.func.isRequired,
};
