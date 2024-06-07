import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/posts";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

function Posts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <div className="home">
            <div>
                <PostForm />
                <div>
                    {posts.map((post) => (
                        <PostItem key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Posts;
