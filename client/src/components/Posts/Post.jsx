import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../redux/modules/posts";

function Post() {
    const dispatch = useDispatch();
    let { id } = useParams();

    const { post, loading } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    return loading || post === null ? null : (
        <div className="home">
            <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
            </div>
            {post.comments.map((comment) => (
                <CommentItem comment={comment} postId={post._id} key={comment._id} />
            ))}
        </div>
    );
}

export default Post;
