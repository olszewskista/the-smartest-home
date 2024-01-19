import { useState } from "react";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";

export default function Comment({ comment, setHelper}) {
    const [editing, setEditing] = useState(false);

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
        </>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    setHelper: PropTypes.func.isRequired,
};