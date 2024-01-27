import PropTypes from 'prop-types';
import Comments from './Comments';
import CommentForm from './CommentForm';
import Post from './Post';

export default function DisplayPosts({ posts, setHelper }) {
    console.log(posts);
    
    return (
        <ul>
            {posts.map((post) => (
                <li key={post._id}>
                    <Post post={post} setHelper={setHelper}/>
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
