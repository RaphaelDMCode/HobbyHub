// ---[Shows all the Posts ever Created]--- //
// ---[Home Feed]--- //
import { useState, useEffect } from "react"
import { supabase } from "../client"
import PostCard from "../components/PostCard"

const PostFeed = () => {
    const [entries, setEntries] = useState([]);
    const [sortBy, setSortBy] = useState("created_at");     // Sorting
    const [searchTerm, setSearchTerm] = useState("");       // Search
    const FLAGS = ["All", "Question", "Opinion", "Discussion", "Recommendation", "News", "Other"]
    const [flagFilter, setFlagFilter] = useState("All");

    // [Fetches Data from Supabase] //
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Bookies')
                .select('*')                                // Selects all Columns of the Table
                .order(sortBy, { ascending: false })        // New Entry appears first
            
            if (error) {
                console.error("Fetch Error:", error);
                return;
            }
            
            setEntries(data || []);
        }
        fetchPost();
    }, [sortBy]);

    const filteredPosts = entries.filter(entry =>{
        const matchedTitle = entry.topic?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchedFlag = flagFilter === "All" || (entry.flag || "Other") === flagFilter;
        return matchedTitle && matchedFlag;
    });


    return (
        <div className="PostFeedContainer">
            <h1 className="PF-title">Community Feed</h1>

            <div className="PF-controls">
                {/* [Sorting] */}
                <div className="Sort-Bar">
                    <label>Sorted by: </label>
                    <select value={sortBy} className="Sort-select" onChange={(e) => setSortBy(e.target.value)}>
                        <option value="created_at">Newest</option>
                        <option value="upVote">Most Upvoted</option>
                    </select>
                </div>

                {/* [Filter Flags] */}
                <label className="PF-FlagFilter">Filter by Type: </label>
                <select className="Flag-select" value={flagFilter} onChange={(e) => setFlagFilter(e.target.value)}>
                    {FLAGS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>

                {/* [Search] */}
                <div className="Search-Bar">
                    <input type="text" className="Search-Input" placeholder="Search Posts by Title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </div>

            <div className="Horizontal-Scroll">
                {entries.length === 0 && (
                    <p className="NA">There are no Posts Yet</p>
                )}

                {entries.length > 0 && filteredPosts.length === 0 && (
                    <p className="NA">No Post Matches</p>
                )}

                {filteredPosts.length > 0 && (
                    filteredPosts.map((entry) => (
                        <PostCard
                            key={entry.id}
                            entry={entry}
                        />
                    ))
                )}
            </div>
        </div>
    )

}

export default PostFeed;