import PropTypes from 'prop-types';
import { useFormik } from 'formik';

export default function CommentForm({setHelper, postId, init, edit, setEditing}) {
    const formik = useFormik({
        initialValues: {
            content: init || '',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:3000/comments/' + postId, {
                    method: edit ? 'PUT' : 'POST',
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
                if (edit) setEditing(false);
                actions.resetForm();
            } catch (error) {
                console.log(error);
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <input type="text" {...formik.getFieldProps('content')} />
            <button className='bg-orange-300 p-2 rounded' type="submit">Send</button>
        </form>
    );
}

CommentForm.propTypes = {
    init: PropTypes.string,
    postId: PropTypes.string.isRequired,
    setHelper: PropTypes.func.isRequired,
    edit: PropTypes.bool,
    setEditing: PropTypes.func,
};

