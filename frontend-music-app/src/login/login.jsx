// import "./login.css"
import { useContext, useState } from "react";
import { endpointContext } from "../endpoints";
import "./login.css"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const {registerUser} = useContext(endpointContext)

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    registerUser(username, password, isAdmin);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
  }


  return (
    <div>
      <div className="container">
        <div className="form-container">
            <form id="registerForm" onSubmit={handleRegisterSubmit}>
                <h2>Register</h2>
                <input onChange={(e) => setUsername(e.target.value)} type="text" id="registerUsername" placeholder="Username" required />
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="registerPassword" placeholder="Password" required />
                <button type="submit">Register</button>
            </form>

            <hr /> 

            <form id="loginForm" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="text" id="loginUsername" placeholder="Username" required />
                <input type="password" id="loginPassword" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>   
            
            <hr /> 

            <div style={{padding: 20, color: "black"}}>
              {isAdmin ? "Signing in as Admin" : "Signing in as Client"}
            </div>
            <button onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin ? "Sign in as client" : "Sign in as Admin"}
            </button>
        </div>
      </div>
    </div>
  )
}
