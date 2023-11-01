import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { header, siteManagerLogin } from '../Layout'

export default function SiteManagerLogin() {
    // Route navigation.
    const navigate = useNavigate()
    // The input for the username.
    const [username, setUsername] = useState('')
    // The input for the password.
    const [password, setPassword] = useState('')
    // The confirmation text that will indicate failure to log in.
    const [confirmation, setConfirmation] = useState(undefined)

    /** Log in to the site with the entered credentials. */
    function handleButtonLogin() {
        setUsername(document.getElementById('username').value)
        setPassword(document.getElementById('password').value)

        if (username && password) {
            // FOR TESTING
            navigate('/SiteManagerListStores')
        } else setConfirmation('Invalid credentials.')
    }

    return (
        <div className='SiteManagerLogin'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={siteManagerLogin}>
                <div style={siteManagerLogin.title}>-- SITE MANAGER LOGIN --</div>
                <div style={siteManagerLogin.login}>
                    <label>Username:&emsp;</label>
                    <input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} style={siteManagerLogin.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Password:&emsp;&nbsp;</label>
                    <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} style={siteManagerLogin.entry} className='Entry-light'></input>
                </div>
                <button onClick={handleButtonLogin} style={siteManagerLogin.button} className='Button-light'>Log In</button><br />
                <label>{confirmation}</label>
            </div>
        </div>
    )
}