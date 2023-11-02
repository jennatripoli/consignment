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
    const [confirmation, setConfirmation] = useState('')

    /** Log in to the site with the entered credentials. */
    async function handleButtonLogin() {
        setConfirmation('Logging in, please wait.')
        try
        {
            let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/SiteManagerLogin',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })
            if (resp.status == 200)
            {
                navigate('/SiteManagerListStores')
            } else setConfirmation('Incorrect username or password.')
        } catch (e)
        {
            console.log(e);
            setConfirmation('Login attempt failed')
        }
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
                {confirmation.length > 0 && <label>{confirmation}</label>}
            </div>
        </div>
    )
}