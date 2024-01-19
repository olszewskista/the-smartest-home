import { useState } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";

export default function Comment({ comment, setHelper}) {
    const [editing, setEditing] = useState(false);

    async function handleDelete() {
        try {
            const response = await fetch('http://localhost:3000/comments/' + comment._id, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setHelper(prev => !prev);
        } catch (error) {
            console.log(error);
        }
    }
    return (<>
        {!editing && (
            <div>
                <p>{comment.content}</p>
                <p>
                    <span>
                        {new Date(
                            comment.date
                        ).toLocaleDateString()}{' '}
                    </span>
                    <span>{comment.author.name}</span>
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
        <button onClick={() => setEditing((prev) => !prev)}>
            Edit
        </button>
        <button onClick={handleDelete}>Delete</button>
        </>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    setHelper: PropTypes.func.isRequired,
};