// ---[Display Posts and Handles Vote Updates]--- //
import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../client"

const Post = ({id, topic, title, image, author, content, upVote, downVote}) => {

    const [likes, setLikes] = useState(upVote);             // Upvotes of a Post
    const [dislikes, setDislikes] = useState(downVote);     // Downvote of a Post

    // [Update Amount of Likes] //
    const updateUpVote = async () => {
        // up.preventDefault();

        const { error } = await supabase
            .from('Bookies')
            .update({ upVote: likes + 1 })
            .eq('id', id)

        if (error) {
            console.error('Upvote Error:', error);
            return;
        }        

        setLikes(prev => prev + 1);
    }

    // [Update Amount of Dislikes] //
    const updateDownVote = async () => {
        // down.preventDefault();

        const { error } = await supabase
            .from('Bookies')
            .update({ downVote: dislikes + 1 })
            .eq('id', id)
            .select()       // Returns Updated Data
        
        if (error) {
            console.error('Downvote Error:', error);
            return;
        }

        setDislikes(prev => prev + 1);
    }


    return (
        <div className="PostCard">
            <Link to={`/posts/${id}`} className="P-Link">
                <h2 className="P-topic">{topic}</h2>
                <h3 className="P-title">{title}</h3>
                <h3 className="P-author">{author}</h3>

                {/* Image (--Optioal--) */}
                {image && <img src={image} alt="Post-Image" className="Post-Image" />}     {/* Ensures Image is not Broken Icons */}

                <p className="P-content">{content}</p>
            </Link>

            <div className="P-ratings">
                <button className="like-Btn">▲: {likes}</button>
                <button className="dislike-Btn">▼: {dislikes}</button>
            </div>
        </div>
    )
}

export default Post;