// ---[The Page that Appears First]--- //
import { useState } from "react"
import { Link } from "react-router-dom"

const IntroPage = () => {
    return (
        <div className="Intro-Container">
            {/* ---[Introduction]--- */}
            <h1 className="Intro-Title">Welcome to BookVerse Hub</h1>
            <p className="Intro-Description">
                This Web App is a community-driven platform for People who likes reading to explore, share, 
                and discuss their favorite books, novels, and such. Like other Social Media platform, this Web App 
                allows Readers to post their thoughts, opinion, and connect with others who share the same 
                likes and dislikes. Dive into the BookVerse and join the world built by Readers, for other Reader.
            </p>

            {/* ---[Authentication]--- */}
            <div className="Authen-box">
                <h2 className="Authen-Title">Entrer Forum</h2>
                <p className="Authen-Description">Just a reminder to be friendly and respectful!</p>

                <Link to="/feed">
                    <button className="enter-Btn">Enter Community</button>
                </Link>
            </div>
        </div>
    )
}

export default IntroPage;