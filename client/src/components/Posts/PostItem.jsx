import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, deletePost } from "../../redux/modules/posts";
import { formatDate, getProfileImage } from "../../utils";

const PostItem = ({ post: { _id, text, name, user, likes, comments, date }, showActions }) => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    return (
        <div className="post-card">
            <div className="row">
                <div className="column">
                    <img className="profile" alt="" src={getProfileImage(user)} />
                    <p>{name}</p>
                </div>
                <div className="column" style={{ width: "75%", textAlign: "left", marginTop: 10 }}>
                    <p>{text}</p>
                    <small style={{ color: "gray" }}>Posted at {formatDate(date)}</small>
                    {showActions && (
                        <div>
                            <button type="button" className="btn btn-light" onClick={() => dispatch(addLike(_id))}>
                                <i className="fas fa-thumbs-up" />
                                <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                            </button>
                            <button type="button" className="btn btn-light" onClick={() => dispatch(removeLike(_id))}>
                                <i className="fas fa-thumbs-down" />
                            </button>
                            <Link to={`/posts/${_id}`} className="btn btn-primary">
                                Discussion
                                {comments.length > 0 && <span className="comment-count">{comments.length}</span>}
                            </Link>
                            {!users.loading && user === users.user._id && (
                                <button type="button" className="btn btn-light" onClick={() => dispatch(deletePost(_id))}>
                                    <i className="fas fa-trash" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    showActions: true
};

export default PostItem;
