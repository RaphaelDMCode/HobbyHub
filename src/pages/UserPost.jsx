// ---[Only Displays the Post the User has Created]--- //
import { useState, useEffect } from "react"
import { supabase } from "../client"
import Post from "../components/Post"

const UserPost = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Bookies')
                .select('*')
                .eq('creator', localStorage.getItem('username'))
                .order('created_at', { ascending: false })
            if (error) {
                console.error('Oops I did it Again!', error);
            } else {
                setPosts(data);
            }
        }
        fetchPost();
    }, []);

    return (
        <div className="UserContainer">
            <h1 className="UC-Title">Your Posts</h1>
            
            <div className="UserContent">
                {posts.length === 0 ? (
                    <p className="UC-Empty">No Post Yet.</p>
                ) : (
                    posts.map((pts) => (
                        <Post 
                            key={pts.id}
                            id={pts.id}
                            topic={pts.topic}
                            image={pts.image}
                            title={pts.title}
                            author={pts.author}
                            content={pts.content}
                            upVote={pts.upVote}
                            downVote={pts.downVote}
                            comment={pts.comment}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default UserPost;