import PropTypes from 'prop-types';
import Comments from './Comments';
import CommentForm from './CommentForm';

export default function DisplayPosts({ posts, setHelper }) {
    console.log(posts);
    return (
        <ul>
            {posts.map((post) => (
                <li key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p><span>{post.author.name} </span><span>{new Date(post.date).toLocaleDateString()}</span></p>
                    <CommentForm setHelper={setHelper} postId={post._id}/>
                    <Comments post={post} setHelper={setHelper}/>
                </li>
            ))}
        </ul>
    );
}

DisplayPosts.propTypes = {
    posts: PropTypes.array.isRequired,
    setHelper: PropTypes.func.isRequired,
};
