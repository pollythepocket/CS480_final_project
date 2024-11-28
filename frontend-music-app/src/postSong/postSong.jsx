import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { endpointContext } from "../endpoints";
import "./postSong.css";

export default function PostSongPage() {
    let navigate = useNavigate();
    const location = useLocation();
    const username = location.state;
    
    const { addSong, addArtist } = useContext(endpointContext);

    const [isAlbum, setIsAlbum] = useState("no");
    const [AlbumName, setAlbumName] = useState("");
    const [ArtistName, setArtistName] = useState(username);
    const [Duration, setDuration] = useState("");
    const [songs, setSongs] = useState([]); 
    const [songInput, setSongInput] = useState("");
    const [singleSong, setSingleSong] = useState(""); 

    const handleSubmit = () => {
        if (isAlbum === "yes") {
            console.log("Album created with the following songs:");
            console.log("Album Name:", AlbumName);
            console.log("Artist Name:", ArtistName);
            console.log("Songs:", songs);
        } else {
            console.log("Single song posted:");
            console.log("Song Name:", singleSong);
            console.log("Artist Name:", ArtistName);
            
            addArtist(ArtistName);
            addSong(singleSong, ArtistName, null, Duration);

        }
    };

    const handleAlbumChange = (e) => {
        setIsAlbum(e.target.value);
    };

    const handleAlbumNameChange = (e) => {
        setAlbumName(e.target.value);
    };

    const handleArtistChange = (e) => {
        setArtistName(e.target.value);
    };

    const handleAddSong = () => {
        if (songInput.trim() !== '') {
            setSongs([...songs, songInput]);
            setSongInput('');
        }
    };

    const handleRemoveSong = (index) => {
        setSongs(songs.filter((_, i) => i !== index));
    };

    const handleSingleSongChange = (e) => {
        setSingleSong(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    return (
        <div className="post-form">
            <h1>Post Song</h1>
            <hr />
            
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

            {isAlbum === "yes" && (
                <div>
                    <div className="album-name">
                        <label>Album Name</label>
                        <input
                            className="album_name"
                            placeholder="What is the name of your album?"
                            required
                            value={AlbumName}
                            onChange={handleAlbumNameChange}
                        />
                    </div>
                    <div className="artist-name">
                        <label>Artist Name</label>
                        <input
                            className="artist_name"
                            placeholder={username}
                            readOnly
                            value={ArtistName}
                            onChange={handleArtistChange}
                        />
                    </div>

                    <div className="add-song">
                        <input
                            type="text"
                            value={songInput}
                            onChange={(e) => setSongInput(e.target.value)}
                            placeholder="Add a song to your album"
                        />
                        <button onClick={handleAddSong}>Add Song</button>
                    </div>

                    <div className="song-list">
                        {songs.length === 0 ? (
                            <p>No songs added yet.</p>
                        ) : (
                            songs.map((song, index) => (
                                <div key={index} className="song-item">
                                    <span>{song}</span>
                                    <button onClick={() => handleRemoveSong(index)}>Remove</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {isAlbum === "no" && (
                <div className="single-song">
                    <div className="single-song-name">
                        <label>Song Name</label>
                        <input
                            type="text"
                            value={singleSong}
                            onChange={handleSingleSongChange}
                            placeholder="Enter your song name"
                        />
                    </div>
                    <div className="single-artist-name">
                        <label>Artist Name</label>
                        <input
                            className="artist_name"
                            placeholder={username}
                            readOnly
                            value={ArtistName}
                            onChange={handleArtistChange}
                        />
                    </div>
                    <div className="single-duration">
                        <label>Song Duration</label>
                        <input
                            className="duration"
                            placeholder="How Long is the song? Example: '3:12'"
                            value={Duration}
                            onChange={handleDurationChange}
                        />
                    </div>
                </div>
            )}

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
