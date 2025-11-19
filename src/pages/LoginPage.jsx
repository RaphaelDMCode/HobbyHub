// ---[Unique Users Loggin]--- //
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem('username');

        if (saved) {
            setUsername(saved);
        };
    }, []);

    const handleSave = () => {
        if (username.trim() === "") {
            return;
        }

        localStorage.setItem('username', username.trim());

        navigate("/");
    }

    return (
        <div className="AuthenPage">
            <div className="Authen-Container">
                <h1>Welcome!</h1>
                <p className="Authen-Description">Before entering our little group of Book lovers community, please choose a username to introduce yourself into the community.</p>

                <input type="text" className="Authen-Input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                <button className="authen-Btn" onClick={handleSave}>Log In</button>

            </div>
        </div>
    )
}

export default LoginPage;