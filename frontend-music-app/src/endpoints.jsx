

import { createContext } from 'react'

export const endpointContext = createContext();

export default function EndpointContextProvider( {children} ) {
  
  const registerUser = (username, password) => {

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <endpointContext.Provider value={{registerUser}}>
      {children}
    </endpointContext.Provider>
  )
}
