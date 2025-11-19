// ---[Post Layout]--- //
import { Link } from "react-router-dom";

const PostCard = ({ entry }) => {
    return (
        <div className="PostContainer">
            <Link to={`/posts/${entry.id}`} className="PC-link">

                <div className="PC-header">
                    <h3 className="PC-topic">{entry.topic}</h3>
                </div>

                {/* Flags */}
                <div className="PC-FlagFilter">
                    <span className="PC-flag">
                        {entry.flag || "Other"}
                    </span>

                    <h2>{entry.title}</h2>
                </div>

                {/* Video Indicator (Clickable) */}
                <div className="PC-vid">
                    {entry.vid_url && <span className="PC-url">Video</span>}
                </div>

                {entry.image && (<img src={entry.image} alt="Post" className="PC-img" />)}

                <div className="PC-Footer">
                    <span className="vote">▲ {entry.upVote}</span>
                    <span className="vote">▼ {entry.downVote}</span>

                    <span className="PC-time">
                        {entry.created_at ? new Date(entry.created_at).toLocaleString() : ""}
                    </span>
                </div>

            </Link>
        </div>
    )
}

export default PostCard;