// ---[Create and Submit a New Post]--- //
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../client"

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({topic: "", title: "", image: "", author: "", content: "", secret_key: "", vid_url: "", flag: "Other"});
    const FLAGS = ["Question", "Opinion", "Discussion", "Recommendation", "News", "Other"]

    // [Handling Input Changes] //
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    // [Inserting Data to Supabase] //
    const handleSubmit = async (event) => {
        event.preventDefault();
        await supabase
            .from('Bookies')
            .insert({
                topic: form.topic,
                title: form.title,
                image: form.image,
                author: form.author,            // Author of the Book
                content: form.content,
                upVote: 0,
                downVote: 0,
                secret_key: form.secret_key,
                creator: localStorage.getItem('username'),
                vid_url: form.vid_url,
                flag: form.flag
            })
            // .select();
        navigate("/feed");
    }


    return (
        <div className="FormContainer">
            <div className="FormContent">
                <h2 className="CreatePostTitle">Create a Post</h2>

                <form onSubmit={handleSubmit} className="CreatePostForm">
                    <label htmlFor="topic">Topic:</label> <br />
                    <input type="text" id="topic" name="topic" value={form.topic} onChange={handleChange} required />
                    <br />


                    <label htmlFor="title">Title:</label> <br />
                    <input type="text" id="title" name="title" value={form.title} onChange={handleChange}  />
                    <br />


                    <label htmlFor="author">Author:</label> <br />
                    <input type="text" id="author" name="author" value={form.author} onChange={handleChange}  />
                    <br />


                    {/* Image Section (--Optional--) */}
                    <label htmlFor="image">Image URL:</label> <br />
                    <input type="text" name="image" id="image" value={form.image} onChange={handleChange} />
                    <br />


                    {/* Video URL Input */}
                    <label htmlFor="vid_url">Video URL (optional):</label> <br />
                    <input type="url" id="vid_url" name="vid_url" value={form.vid_url} onChange={handleChange} placeholder="https://youtube.com/..." />
                    <br />


                    <label htmlFor="content">Content:</label> <br />
                    <textarea type="text" id="content" name="content" value={form.content} onChange={handleChange} />
                    <br />


                    {/* Flag Dropdown */}
                    <label htmlFor="flag">Post Type:</label> <br />
                    <select name="flag" id="flag" value={form.flag} onChange={handleChange}>
                        {FLAGS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <br />

                    {/* Secret Key Input */}
                    <label htmlFor="secret_key">Secret Key (Required to Edit/Delete):</label> <br />
                    <input type="password" name="secret_key" value={form.secret_key} onChange={handleChange} required />
                    <br /><br />


                    <button type="submit" className="CreatePost-Btn">Create Post</button>
                </form>
            </div>
        </div>
    )

}

export default CreatePost;