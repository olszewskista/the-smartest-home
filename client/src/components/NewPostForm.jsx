import { useFormik } from 'formik';
import PropTypes from 'prop-types';

export default function NewPostForm({setHelper}) {
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setHelper(prev => !prev)
                actions.resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" {...formik.getFieldProps('title')} />
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id=""
                    cols="30"
                    rows="10"
                    {...formik.getFieldProps('content')}
                ></textarea>
            </div>
            <button type="submit">Create your post</button>
        </form>
    );
}

NewPostForm.propTypes = {
    setHelper: PropTypes.func.isRequired,
};