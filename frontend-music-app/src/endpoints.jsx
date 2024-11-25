

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
    .then(data => {alert(data); navigate("/songs", { replace: true })})
    .catch(error => console.error('Error:', error));
  }

  return (
    <endpointContext.Provider value={{registerUser}}>
      {children}
    </endpointContext.Provider>
  )
}
