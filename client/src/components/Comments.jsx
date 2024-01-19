import PropTypes from 'prop-types';
import Comment from './Comment';

export default function Comments({ post, setHelper }) {
    const nonEmpty = post.comments.length > 0;
    return (
        <div>
            {nonEmpty && (
                <ul>
                    {post.comments.map((comment) => (
                        <li key={comment._id}>
                            <Comment comment={comment} setHelper={setHelper}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

Comments.propTypes = {
    post: PropTypes.object.isRequired,
    setHelper: PropTypes.func.isRequired,
};
