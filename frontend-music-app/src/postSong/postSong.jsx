import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./postSong.css"

export default function PostSongPage() {
    const [isAlbum, setIsAlbum] = useState("no");

    let navigate = useNavigate();
    const location = useLocation();
    const username = location.state;

    const handleSubmit = () => {
        if (isAlbum) {
            console.log("Album created with the following songs:");
        } else {
            console.log("Single song posted:");
        }
    };

    const handleAlbumChange = (e) => {
        setIsAlbum(e.target.value);
    };

    return (
        <div className="post-form">
            <h1>Post Song</h1>

            <hr/>

            <div className="options">
                <label>Are you creating an album?</label>
                <label className="radio-button">
                    <input
                        type="radio"
                        value="yes"
                        checked={isAlbum === "yes"}
                        onChange={handleAlbumChange}
                    />
                    Yes
                </label>
                <label className="radio-button">
                    <input
                        type="radio"
                        value="no"
                        checked={isAlbum === "no"}
                        onChange={handleAlbumChange}
                    />
                    No
                </label>
            </div>

            {isAlbum === "yes" ?(
                <div></div>
            ) : (
                <div></div>
            )}


            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
} 
