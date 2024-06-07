import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, getProfileImage } from "../../utils";
import { deleteComment } from "../../redux/modules/posts";

const CommentItem = ({ postId, comment: { _id, text, name, user, date } }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img className="profile" alt="" src={getProfileImage(user)}></img>
          <p>{name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          <p>{text}</p>
          <small style={{ color: "gray" }}>Posted at {formatDate(date)}</small>
          {!users.loading && user === users.user._id && (
            <div>
              <button
                onClick={() => dispatch(deleteComment({ postId, commentId: _id }))}
                type="button"
                className="btn btn-light"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
