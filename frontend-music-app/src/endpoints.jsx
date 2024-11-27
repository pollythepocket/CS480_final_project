

import { createContext } from 'react'
import { useNavigate } from 'react-router';


export const endpointContext = createContext();

export default function EndpointContextProvider( {children} ) {
  const navigate = useNavigate();
  
  const registerUser = (username, password, isAdmin) => {

    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, isAdmin })
    })
    .then(response => response.text())
    .then(data => {alert(data); if(!data.includes('Duplicate entry')){navigate("/songs", {state: username })}})
    .catch(error => {console.error('Error:', error)});
  };

  const loginUser = (username, password, isAdmin) => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, isAdmin })
  })
    .then(response => response.text())
    .then(message => {if(message.includes('success')){navigate("/songs", {state: username })}})
    .catch(error => console.error('Error:', error));
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
        throw error; // Re-throw error for further handling
    }
};



  const getLikedSongs = async(username) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/favorite-songs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
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
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/add-to-favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id, username }),
    })
      .then((response) => response.text())
      .then((data) => {})
      .catch((error) => console.error('Error:', error));
  };

  const deleteLikedSong = (song_id, username) => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/deleteLikedSong`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id, username }),
    })
      .then((response) => {})
      .then((data) => alert(data))
      .catch((error) => console.error('Error:', error));
  }
  



  return (
    <endpointContext.Provider value={{registerUser, loginUser, getAllSongs, getLikedSongs, addLikedSong, deleteLikedSong}}>
      {children}
    </endpointContext.Provider>
  )
}
