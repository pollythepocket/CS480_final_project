import React from "react";
import "./toolbar.css";
import { useNavigate } from "react-router";

export default function AdminToolbar({username}) {
    let navigate = useNavigate();

    const routeToAdminHome = () => {
        let path = '/admin';
        navigate(path, {state: username});
    }  

    const routeToManageSongs = () => {
        let path = '/admin/manage';
        navigate(path, {state: username});
    }

    const routeToLibrary = () => {
        let path = '/admin/songs';
        navigate(path, {state: username});
    }

    const routeToLogin = () => {
        let path = '/login';
        navigate(path, {state: username});
    } 

    return (
        <div className="toolbar">
            <button type="submit" className="taskbar-button" onClick={routeToAdminHome}>Admin Dashboard</button>
            <button type="submit" className="taskbar-button" onClick={routeToManageSongs}>Post Song</button>
            <button type="submit" className="taskbar-button" onClick={routeToLibrary}>Library</button>
            <button type="submit" className="taskbar-button" onClick={routeToLogin}>Logout</button>
        </div>
    );
}
