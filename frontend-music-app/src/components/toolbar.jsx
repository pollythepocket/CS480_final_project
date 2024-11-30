import React, { useContext, useState } from "react";
import "./toolbar.css";
import { endpointContext } from "../endpoints";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useEffect } from "react";

export default function Toolbar({username}) {
    let navigate = useNavigate();
    const [clientRequestStatus, setClientRequest] = useState("");
    const {getClientRequestInfo} = useContext(endpointContext);

    const handleGetRequestInfo = () => {
      getClientRequestInfo(username)
        .then((fetchedVarchr) => {
          console.log(fetchedVarchr); 
          const permission = fetchedVarchr[0]?.has_artist_permission;
          setClientRequest(permission || "no"); 
        })
        .catch((err) => {
          console.error(err);
          setClientRequest("no"); 
        });
    }
    
    
    useEffect(() => {
      handleGetRequestInfo()
    }, [username]); 
    


    const routeChange = () => {
        let path = '/songs';
        navigate(path, {state: username});
      }  
    
      const routeChangeToLikedList = () => {
        let path = '/LikedSongs';
        navigate(path, {state: username});
      } 

      const routeChangeToLogin = () => {
        let path = '/login';
        navigate(path, {state: username});
      } 

      const handlePostSong = () => {
        let path = '/PostSong';
        navigate(path, {state: username});
      }

      const handleRequestChange = (requestingTo) => {
        editClientRequest(requestingTo, username);
        handleGetRequestInfo();
      }
  

  return (
    <div className="toolbar">
          <button type="submit" className="taskbar-button" onClick={routeChange}>Home</button>
          {<button type="submit" className="taskbar-button" onClick={routeChangeToLikedList}>Liked Songs</button> }

          {clientRequestStatus === "yes" ? (
                <button type="submit" className="taskbar-button" onClick={() => handlePostSong()}>Post Song</button>
            )
 
          : clientRequestStatus === "no" ? (
                <button type="submit" className="taskbar-button" onClick={() => handleRequestChange("requesting")}>Request Artist Status</button>
          )

          : clientRequestStatus === "requesting" ? (
            <button type="submit" className="request-button">Request being handled</button>
          )

          : null
          }
              

          <button type="submit" className="taskbar-button" onClick={() => routeChangeToLogin()}>Logout</button>
    </div>
  );
}
