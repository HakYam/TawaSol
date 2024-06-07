import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/modules/posts";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ postId, text }));
    setText("");
  };

  return (
    <div className="post-card">
      <p className="form-title center">Leave a comment</p>
      <hr />
      <form className="" onSubmit={onSubmit}>
        <div>
          <textarea
            placeholder="Enter your comment"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default CommentForm;
