// ---[Edit or Delete an Already Existing Post / Entry]--- //
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../client"

const EditPost = () => {
    const navigate = useNavigate();
    const {id} = useParams();       // ID Routes
    const [form, setForm] = useState({topic: "", title: "", image: "", author: "", content: "", secret_key: "", vid_url: "", flag: "Other"});
    const [storedKey, setStoredKey] = useState("");
    const FLAGS = ["Question", "Opinion", "Discussion", "Recommendation", "News", "Other"]

    // [Fetches Existing Data] //
    useEffect(() => {
        const fetchPostData = async () => {
            const { data } = await supabase
                .from('Bookies')
                .select()
                .eq('id', id)
                .single()

            if (data) {
                // [Fills Form with the Fetched Data] //
                setForm({
                    topic: data.topic,
                    title: data.title,
                    author: data.author,
                    image: data.image,
                    content: data.content,
                    secret_key: "",          // User Input
                    vid_url: data.vid_url || "",
                    flag: data.flag || "Other"
                })
                setStoredKey(data.secret_key);
            }
        }
        fetchPostData();
    }, [id])
    
    // [Handle Input Chnages] //
    const handleChange = (event) => {
        const {name, value} = event.target
        setForm((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // [Handle Changes Update] //
    const handleUpdate = async (event) => {
        event.preventDefault();

        if (form.secret_key !== storedKey) {
            alert('Incorrect Key. Cannot Update Post')
            return;
        }

        await supabase
        .from('Bookies')
        .update({
            topic: form.topic,
            title: form.title,
            image: form.image,
            author: form.author,
            content: form.content,
            vid_url: form.vid_url,
            flag: form.flag
        })
        .eq('id', id)
        // .select();

        navigate(`/posts/${id}`);
    }

    // [Handle Post Deletion] //
    const handleDelete = async (event) => {
        event.preventDefault();
        const key = prompt("Enter Secret Key to DELETE this post:");

        if (key !== storedKey) {
            alert("Incorrect Key, Post cannot be Deleted");
            return;
        }

        await supabase
            .from('Bookies')
            .delete()
            .eq('id', id)
        navigate("/feed");
    }


    return (
        <div className="FormContainer">
            <div className="FormContent">
                <h2 className="EditPostTitle">Editing Post</h2>

                <form onSubmit={handleUpdate} className="EditPostForm">
                    <label htmlFor="topic">Topic:</label> <br />
                    <input type="text" id="topic" name="topic" value={form.topic} onChange={handleChange} required />
                    <br />


                    <label htmlFor="title">Title:</label> <br />
                    <input type="text" id="title" name="title" value={form.title} onChange={handleChange} />
                    <br />


                    <label htmlFor="author">Author:</label> <br />
                    <input type="text" id="author" name="author" value={form.author} onChange={handleChange} />
                    <br />


                    {/* Image Section */}
                    <label htmlFor="image">Image URL:</label> <br />
                    <input type="text" name="image" id="image" value={form.image} onChange={handleChange} />
                    <br />


                    {/* Video URL Input */}
                    <label htmlFor="vid_url">Video URL:</label> <br />
                    <input type="url" id="vid_url" name="vid_url" value={form.vid_url} onChange={handleChange} placeholder="https://youtube.com/..." />
                    <br />


                    <label htmlFor="content">Content:</label> <br />
                    <textarea type="text" id="content" name="content" value={form.content} onChange={handleChange} required />
                    <br />


                    {/* Flag Dropdown */}
                    <label htmlFor="flag">Post Type:</label> <br />
                    <select name="flag" id="flag" value={form.flag} onChange={handleChange}>
                        {FLAGS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <br />


                    {/* Secrey Ket Input */}
                    <label htmlFor="secret_key">Secet Key to Save Changes</label> <br />
                    <input type="password" name="secret_key" value={form.secret_key} onChange={handleChange} required />
                    <br />

                    <div className="EditButtons">
                        <button type="submit" className="EditPost-Btn">Save</button>
                        <button type="button" onClick={handleDelete} className="DeletePost-Btn">Remove Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPost;