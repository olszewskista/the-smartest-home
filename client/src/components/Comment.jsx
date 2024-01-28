import { useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';

export default function Comment({ comment, setHelper }) {
    const [editing, setEditing] = useState(false);

    async function handleDelete() {
        try {
            const response = await fetch(
                '/api/comments/' + comment._id,
                {
                    method: 'DELETE',
                    credentials: 'include',
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setHelper((prev) => !prev);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col gap-2 mt-4 bg-neutral-200 rounded p-2 shadow-md'>
            {!editing && (
                <div className="flex flex-col gap-1">
                    <p>{comment.content}</p>
                    <p className="flex justify-between">
                        <span>
                            {new Date(comment.date).toLocaleDateString()}{' '}
                        </span>
                        <span>- {comment.author.name}</span>
                    </p>
                </div>
            )}
            {editing && (
                <CommentForm
                    postId={comment._id}
                    setHelper={setHelper}
                    init={comment.content}
                    edit={true}
                    setEditing={setEditing}
                />
            )}
            <div className='flex items-center justify-around'>
                <button className='bg-orange-300 p-1 rounded' onClick={() => setEditing((prev) => !prev)}>
                    Edit
                </button>
                <button className='bg-red-400 text-white p-1 rounded' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    setHelper: PropTypes.func.isRequired,
};
