import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { endpointContext } from "../endpoints";
import "./postSong.css";

export default function PostSongPage() {
    let navigate = useNavigate();
    const location = useLocation();
    const username = location.state;
    
    const { addSong, addArtist, isAdmin, addAlbum} = useContext(endpointContext);

    const [isAlbum, setIsAlbum] = useState("song");
    const [AlbumName, setAlbumName] = useState("");
    const [ArtistName, setArtistName] = useState("");
    const [Duration, setDuration] = useState("");
    const [songs, setSongs] = useState([]); 
    const [singleSong, setSingleSong] = useState(""); 


    useEffect(() =>{
        if(!isAdmin){
            setArtistName(username);
        }
    },
    [isAdmin, songs]);

    const handleSetsSongs = (e) => {
        if (!singleSong.trim()) {
            alert("Please enter a song name.");
            return;
        }
    
        if (!ArtistName.trim()) {
            alert("Please enter an artist name.");
            return;
        }
    
        if (!Duration.trim()) {
            alert("Please enter the song duration.");
            return;
        }

        if(!AlbumName.trim()){
            alert("Please enter an album name.");
        }

        setSongs(prevSongs => [...prevSongs, {song: singleSong, duration: Duration}]);

        setDuration('');
        setSingleSong('');
    }

    const handleSubmit = () => {
        if (isAlbum === "album") {
            console.log("Album created with the following songs:");
            console.log("Album Name:", AlbumName);
            console.log("Artist Name:", ArtistName);
            console.log("Songs:", songs);

            if (!ArtistName.trim()) {
                alert("Please enter an artist name.");
                return;
            }
            if (songs.length < 1) {
                alert("Please at least one song.");
                return;
            }
            if(!AlbumName.trim()){
                alert("Please enter an album name.");
            }

            addArtist(ArtistName);
            addAlbum(AlbumName, ArtistName, songs.length);

            songs.forEach(song => {
                console.log(song.song, ArtistName, AlbumName, song.duration);
                addSong(song.song, ArtistName, AlbumName, song.duration);
            });

            navigate("/Songs", {state: username })
            


        } else {
            console.log("Single song posted:");
            console.log("Song Name:", singleSong);
            console.log("Artist Name:", ArtistName);

            if (!singleSong.trim()) {
                alert("Please enter a song name.");
                return;
            }
        
            if (!ArtistName.trim()) {
                alert("Please enter an artist name.");
                return;
            }
        
            if (!Duration.trim()) {
                alert("Please enter the song duration.");
                return;
            }
            
            addArtist(ArtistName);
            addSong(singleSong, ArtistName, null, Duration);
            navigate("/Songs", {state: username })

        }
    };

    const handleBack = () => {
        navigate("/LikedSongs", {state: username })
    }

    const handleAlbumChange = (e) => {
        setIsAlbum(e.target.value);
    };

    const handleAlbumNameChange = (e) => {
        setAlbumName(e.target.value);
    };

    const handleArtistChange = (e) => {
        setArtistName(e.target.value);
    };

    const handleSingleSongChange = (e) => {
        setSingleSong(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    return (
        <div className="post-form">
            {isAlbum === "song" ? (
                <h1>Post Song</h1>
            )
            : isAlbum === "album" ? (
                <h1>Post Album</h1>
            )
            : null
        }
        
        <hr />


        <div className="group">
            <h4 className="label">Are you posting a song or album?</h4>
            <div>
                <div className="radio-options">
                    <input
                    type="radio"
                    name="search-option"
                    value="song"
                    checked={isAlbum === "song"}
                    onChange={handleAlbumChange}
                    />
                    <div className="radio-label">Song</div>
                </div>
                <div className="radio-options">
                    <input
                    type="radio"
                    name="search-option"
                    value="album"
                    checked={isAlbum === "album"}
                    onChange={handleAlbumChange}
                    />
                    <div className="radio-label">Album</div>
                </div>
            </div>
        </div>

        <hr/>
        
        { isAlbum === "song" ? (
            <div className="single-song">
            <div className="row">
                <div className="single-song-name">
                    <label>Song Name</label>
                    <input
                        type="text"
                        value={singleSong}
                        onChange={handleSingleSongChange}
                        placeholder="Enter your song name"
                        required
                    />
                </div>
                <div className="single-artist-name">
                    <label>Artist Name</label>
                    {isAdmin === true ? (
                        <input
                        className="artist_name"
                        placeholder={"Enter Artist Name"}
                        readOnly
                        value={ArtistName}
                        onChange={handleArtistChange}
                        required
                    />
                    ) : 
                    isAdmin === false ? (
                        <input
                        className="artist_name"
                        placeholder={username}
                        readOnly
                        value={ArtistName}
                        onChange={handleArtistChange}
                        required
                    />
                    ) : null}
                </div>
            </div>
            <div className="single-duration" style={{padding: '10px'}}>
                <label>Song Duration</label>
                <input
                    className="duration"
                    placeholder="How Long is the song? Example: '3:12'"
                    value={Duration}
                    onChange={handleDurationChange}
                    required
                />
            </div>
        </div>
        ) : isAlbum === "album" ? (
            <div>
                <div className="single-artist-name">
                    <label>Artist Name</label>
                    {isAdmin === true ? (
                        <input
                        className="artist_name"
                        placeholder={"Enter Artist Name"}
                        readOnly
                        value={ArtistName}
                        onChange={handleArtistChange}
                        required
                    />
                    ) : 
                    isAdmin === false ? (
                        <input
                        className="artist_name"
                        placeholder={username}
                        readOnly
                        value={ArtistName}
                        onChange={handleArtistChange}
                        required
                    />
                    ) : null}
                </div>
                <div className="single-artist-name">
                    <label>Album Name</label>
                    <input
                        className="artist_name"
                        placeholder="Enter Album Name"
                        value={AlbumName}
                        onChange={handleAlbumNameChange}
                        required/>
                </div>
                <div className="row">
                    <div className="single-song-name">
                        <label>Song Name</label>
                        <input
                            type="text"
                            value={singleSong}
                            onChange={handleSingleSongChange}
                            placeholder="Enter your song name"
                            required
                        />
                    </div>
                    <div className="single-song-name">
                        <label>Duration</label>
                        <input
                            type="text"
                            value={Duration}
                            onChange={handleDurationChange}
                            placeholder="How Long is the song? Example: '3:12'"
                            required
                        />
                    </div>
                </div>

                <button onClick={handleSetsSongs}>Add</button>

                <ul>
                    {songs && songs.map((item, index) => (
                    <li key={index}>
                        {item.song}: {item.duration}
                    </li>
                    ))}
                </ul>
            </div>
        ) : null}


            <div className="row">
                <button onClick={handleBack}>Back</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
