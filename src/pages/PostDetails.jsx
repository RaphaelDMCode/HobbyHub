// ---[Display a Post's Content when Clicked on PostCard]--- //
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../client"

const PostDetails = () => {
    const {id} = useParams();                   // Gets the Post's ID from URL
    const [entries, setEntries] = useState(null);

    // [Comments] //
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState("");

    const username = localStorage.getItem('username');

    // [Fetches Data from Supabase] //
    useEffect(() => {
        const fetchEntry = async () => {
            const { data } = await supabase
                .from('Bookies')
                .select()
                .eq('id', id)
                .single()
            setEntries(data);
        };

        const fetchComments = async () => {
            const { data } = await supabase
                .from('Comments')
                .select()
                .eq('post_id', id)
                .order('created_at', { ascending: false })
            setComments(data);
        };

        fetchEntry();
        fetchComments();
    }, [id])

    // [upVote Function] //
    const handleUpvote = async () => {
        const { data, error } = await supabase
            .from('Bookies')
            .update({ upVote: entries.upVote + 1 })
            .eq('id', entries.id);
        if (!error) {
            setEntries(prev => ({
                ...prev,
                upVote: prev.upVote + 1
            }))
        }
    }

    // [downVote Function] //
    const handleDownvote = async () => {
        const { data, error } = await supabase
            .from('Bookies')
            .update({ downVote: entries.downVote + 1 })
            .eq('id', entries.id);
        if (!error) {
            setEntries(prev => ({
                ...prev,
                downVote: prev.downVote + 1
            }))
        }
    }

    // [Adding Comment Section] //
    const handleComment = async () => {
        if (newComments.trim() === "") {
            return;
        }

        const { data } = await supabase
            .from('Comments')
            .insert([{ 
                post_id: id,
                comment: newComments,
                // authen: username
            }])
            .select()
        if (data) setComments(prev => [data[0], ...prev]);
        setNewComments("");
    }

    // [Checks for Error] //
    if (!entries) {
        return <p>Loading Posts...</p>
    }


    return (
        <div className="PostDetailsContainer">
            <p className="date-text">
                {new Date(entries.created_at).toLocaleString()}
            </p>

            <h1>{entries.topic}</h1>
            <h2>{entries.title}</h2>
            
            <p className="creator-text">
                Posted by: <span>{entries.creator || "Unknown User"}</span>
            </p>

            {/* Flag Dropdown Display */}
            <h4><strong>Type:</strong> {entries.flag || "Other"}</h4>

            <h3><strong>Author:</strong> {entries.author}</h3>

            {entries.image && <img src={entries.image} alt="Post-Image" />}
            <p>{entries.content}</p>

            {/* Video URL */}
            {entries.vid_url && (
                <p className="PD-vid-con">
                    <strong>Video:</strong>
                    <a href={entries.vid_url} target="_blank" rel="noopener noreferrer">
                        Watch Video
                    </a>
                </p>
            )}

            <div className="PD-ratings">
                <button onClick={handleUpvote}>▲ {entries.upVote} Upvote</button>
                <button onClick={handleDownvote}>▼ {entries.downVote} Downvote</button>

                {/* <p>▲: {entries.upVote} upvotes</p>
                <p>▼: {entries.downVote} downvotes</p> */}
            </div>

            {/* ---[Comments - Input]--- */}
            <div className="commentBox">
                <h3>Leave a Comment</h3>
                <textarea 
                    placeholder="Write a comment..."
                    value={newComments}
                    onChange={(e) => setNewComments(e.target.value)}
                />
                {/* <br /> */}
                <button onClick={handleComment}>Submit Comment</button>
            </div>

            {/* ---[Comments - Display]--- */}
            <div className="PD-comments">
                <h3>Comments:</h3>
                {comments.length === 0 && <p>No Comments yet</p>}
                {comments.map((c) => (
                    <div key={c.id} className="commentCard">
                        <p>{c.comment}</p>
                        <small>{new Date(c.created_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>


            <Link to={`/edit/${entries.id}`}><button>Edit Post</button></Link>       {/* Directs to EditPost.jsx */}
            <Link to="/feed"><button>Back</button></Link>                            {/* Direcrs to PostFeed.jsx */}
        </div>
    )
}

export default PostDetails;