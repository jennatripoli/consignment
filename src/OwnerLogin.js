import { Link, useNavigate } from "react-router-dom"
import { header, ownerLogin } from './Layout'
import { useState } from 'react'

export default function OwnerLogin() {
    const navigate = useNavigate()
    // The input for the username.
    const [username, setUsername] = useState('')
    // The input for the password.
    const [password, setPassword] = useState('')
    // The confirmation text that will indicate failure to log in.
    const [confirmation, setConfirmation] = useState(undefined)

    /** Log in to the store with the entered credentials. */
    function handleButtonLogin() {
        setUsername(document.getElementById('username').value)
        setPassword(document.getElementById('password').value)

        if (username && password) {
        } else setConfirmation('Invalid credentials.')
    }

    return (
        <div className='OwnerLogin'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>
            <div style={ownerLogin}>
                <div style={ownerLogin.title}>-- STORE NAME LOGIN --</div>
                <div style={ownerLogin.login}>
                    <label>Username:&emsp;</label>
                    <input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} style={ownerLogin.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Password:&emsp;&nbsp;</label>
                    <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} style={ownerLogin.entry} className='Entry-light'></input>
                </div>
                <button onClick={handleButtonLogin} style={ownerLogin.button} className='Button-light'>Log In</button><br />
                <label>{confirmation}</label>
            </div>
        </div>
    )
}
