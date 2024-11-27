

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
    .then(message => {alert(message); if(message.includes('success')){navigate("/songs", {state: username })}})
    .catch(error => console.error('Error:', error));
  };

  const getAllSongs = () => {
    return fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/getAllSongs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
  };

  const getLikedSongs = (username) => {
    return fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/getLikedSongs`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ username }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
};


  const addLikedSong = (song_id, username) => {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/addLikedSong`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_id, username }),
    })
      .then((response) => response.text())
      .then((data) => alert(data))
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
