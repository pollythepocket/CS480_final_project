import { createContext, useState } from "react";


export const siteContext = createContext();

export default function SiteContextProvider({children}) {
  const [username, setUsername] = useState("")
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  return (
    <siteContext.Provider value={{songs, users, setSongs, setUsers, username, setUsername}}>
      {children}
    </siteContext.Provider>
  )
}