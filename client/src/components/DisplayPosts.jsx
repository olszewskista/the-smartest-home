import PropTypes from 'prop-types';
import Comments from './Comments';
import CommentForm from './CommentForm';
import Post from './Post';

export default function DisplayPosts({ posts, setHelper }) {
    return (
        <ul className='flex justify-between gap-28 flex-wrap mx-12 mt-4'>
            {posts.map((post) => (
                <li key={post._id} className='max-h-[30rem] overflow-y-auto'>
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
