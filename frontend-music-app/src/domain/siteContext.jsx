import { createContext, useState } from "react";


export const siteContext = createContext();

export default function SiteContextProvider({children}) {
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  return (
    <siteContext.Provider value={{songs, users, setSongs, setUsers}}>
      {children}
    </siteContext.Provider>
  )
}