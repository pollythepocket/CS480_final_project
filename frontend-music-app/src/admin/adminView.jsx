import React, { useState, useEffect } from "react";
import "../Songs/songs.css";
import "./adminView.css";
import AdminToolbar from "../components/adminToolbar";
import { useLocation } from "react-router-dom";

export default function AdminView() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const location = useLocation();
  const username = location.state;

  useEffect(() => {
    // Fetch all clients
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/clients`)
      .then(response => response.json())
      .then(data => {
        console.log("Clients data:", data);
        setClients(data.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
        setError(error.message);
      });
  }, []);

  const togglePasswordVisibility = (clientUsername) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [clientUsername]: !prev[clientUsername]
    }));
  };

  const toggleArtistPermission = (clientUsername, currentPermission) => {
    const newPermission = currentPermission === 'yes' ? 'no' : 'yes';
    
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/clients`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestType: newPermission,
        name: clientUsername
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Update response:", data);
      // Update local state after successful update
      setClients(prevClients => 
        prevClients.map(client => 
          client.username === clientUsername 
            ? {...client, has_artist_permission: newPermission}
            : client
        )
      );
    })
    .catch(error => {
      console.error('Error updating permission:', error);
      setError(error.message);
    });
  };

  const renderPassword = (password, isVisible) => {
    return isVisible ? password : '•'.repeat(15);
  };

  return (
    <div className="song-page">
      <AdminToolbar username={username}/>
      <div style={{ marginTop: '10px' }}>
        <h1>Admin Dashboard</h1>
        <h4>Signed in as Admin</h4>
        {error && <p className="error-message">Error: {error}</p>}
        <h2 style={{color: 'white'}}>Clients List</h2>
        <div className="all-songs">
          <div className="table-container">
            <table className="all-songs-table">
              <thead>
                <tr>
                  <th className="col name">Username</th>
                  <th className="col artist">Password</th>
                  <th className="col duration">Show/Hide</th>
                  <th className="col duration">Artist Permission</th>
                  <th className="col album">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr key={client.username} className="entry-row">
                      <td className="col name">{client.username}</td>
                      <td className="col artist" style={{ fontFamily: 'monospace' }}>
                        {renderPassword(client.password, visiblePasswords[client.username])}
                      </td>
                      <td className="col duration">
                        <button 
                          onClick={() => togglePasswordVisibility(client.username)}
                          className="action-button"
                        >
                          {visiblePasswords[client.username] ? 'Hide' : 'Show'}
                        </button>
                      </td>
                      <td className="col duration">{client.has_artist_permission}</td>
                      <td className="col album">
                        <button 
                          onClick={() => toggleArtistPermission(client.username, client.has_artist_permission)}
                          className="action-button"
                        >
                          {client.has_artist_permission === 'yes' ? 'Remove Artist' : 'Make Artist'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No clients registered</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
