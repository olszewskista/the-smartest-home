import PropTypes from 'prop-types';
import Comments from './Comments';
import CommentForm from './CommentForm';

export default function DisplayPosts({ posts, setHelper }) {
    console.log(posts);
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
        <ul>
            {posts.map((post) => (
                <li key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p><span>{post.author.name} </span><span>{new Date(post.date).toLocaleDateString()}</span></p>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
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
