import PropTypes from 'prop-types';
import Comments from './Comments';



export default function DisplayPosts({ posts, setHelper }) {
    console.log(posts);
    return (
        <ul>
            {posts.map((post) => (
                <li key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>{post.author.name}</p>
                    <p>{new Date(post.date).toLocaleDateString()}</p>
                    <Comments comments={post.comments} postId={post._id} setHelper={setHelper}/>
                </li>
            ))}
        </ul>
    );
}

DisplayPosts.propTypes = {
    posts: PropTypes.array.isRequired,
    setHelper: PropTypes.func.isRequired,
};
