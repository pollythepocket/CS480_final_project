import React, { useState } from "react";
import "./toolbar.css";
import { endpointContext } from "../endpoints";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function Toolbar({username}) {
    let navigate = useNavigate();

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
  

  return (
    <div className="toolbar">
          <button type="submit" className="taskbar-button" onClick={routeChange}>Home</button>
          <button type="submit" className="taskbar-button" onClick={routeChangeToLikedList}>Liked Songs</button>
          <button type="submit" className="taskbar-button" onClick={routeChangeToLogin}>Logout</button>
    </div>
  );
}
