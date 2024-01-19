import PropTypes from 'prop-types';
import { useFormik } from 'formik';

export default function Comments({ comments, postId, setHelper }) {
    const formik = useFormik({
        initialValues: {
            content: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:3000/comments/' + postId, {
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
    const nonEmpty = comments.length > 0;
    return (
        <div>
            {nonEmpty && <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <p>{comment.content}</p>
                        <p>
                            <span>{new Date(comment.date).toLocaleDateString()} </span>
                            <span>{comment.author.name}</span>
                        </p>
                    </li>
                ))}
            </ul>}
            <form onSubmit={formik.handleSubmit}>
                <input type="text" {...formik.getFieldProps('content')} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    setHelper: PropTypes.func.isRequired,
};
