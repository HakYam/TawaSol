import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/modules/posts';

const PostForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost({ text }));
        setText("");
    };

    return (
        <div className="post-card">
            <p className="form-title center">Create Post</p>
            <hr />
            <form onSubmit={onSubmit}>
                <div>
                    <textarea 
                        placeholder="What's on your mind?" 
                        name="text" 
                        value={text} 
                        required 
                        onChange={(e) => setText(e.target.value)} 
                    />
                </div>
                <input type="submit" value="Post" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default PostForm;
