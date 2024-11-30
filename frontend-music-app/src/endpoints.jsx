
import { useState } from 'react';
import { createContext } from 'react'
import { useNavigate } from 'react-router';

export const endpointContext = createContext();

export default function EndpointContextProvider( {children} ) {

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const navigate = useNavigate();
  
  const registerUser = (username, password, isAdmin) => {

    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, isAdmin })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      if(!data.includes('Duplicate entry')){
        setUsername(username);
        setIsAdmin(isAdmin);
        setSignedIn(true);
        navigate("/songs", {state: username })}
      })
    .catch(error => {console.error('Error:', error)});
  };

  const loginUser = (username, password, isAdmin) => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, isAdmin }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'An unknown error occurred');
          });
        }
        return response.json(); 
      })
      .then(data => {
        if (data.message.includes('success')) {
          setUsername(username)
          setIsAdmin(isAdmin)
          setSignedIn(true)
          navigate('/songs', { state: username });
        }
      })
      .catch(error => {
        alert(error.message);
        console.error('Error:', error.message);
      });
  };
  

  const getAllSongs = async (query = '') => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // Use server's error message
            throw new Error(`Error fetching songs: ${errorMessage}`);
        }

        const json = await response.json();
        if (!json || !json.data) {
            throw new Error('Invalid response structure');
        }

        return json.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error; 
    }
};

const addSong = (song_name, artist_name, album_name, duration) => {
  fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({song_name, artist_name, album_name, duration}),
  })
    .then((response) => response.text())
    .then((message) => {if(message.includes('Already')){
        alert(message);
    }})
    .catch((error) => {console.error('Error:', error)});
};

const addArtist = (artist_name) => {
  fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/artists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({artist_name}),
  })
    .then((response) => response.text())
    .then((message) => {})
    .catch((error) => {console.error('Error:', error)});
};



  const getLikedSongs = async(username) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/liked_songs?username=${username}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (!json || !json.data) {
          throw new Error('Invalid response structure');
      }

      return json.data;
  } catch (error) {
      console.error('Error fetching songs:', error);
      throw error;
  }
};


  const addLikedSong = (song_id, username) => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/add_liked_songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id, username }),
    })
      .then((response) => response.text())
      .then((message) => {if(message.includes('Already')){
          alert(message);
      }})
      .catch((error) => {console.error('Error:', error)});
  };

  const deleteLikedSong = (song_id, username) => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/liked_songs`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id, username }),  
    })
    
      .then((response) => {response.text()})
      .then((message) => {})
      .catch((error) => console.error('Error:', error));
    
  }
  



  return (
    <endpointContext.Provider value={{registerUser, loginUser, getAllSongs, getLikedSongs, addLikedSong, deleteLikedSong, addSong, addArtist, username, isAdmin, setSignedIn}}>
      {children}
    </endpointContext.Provider>
  )
}
