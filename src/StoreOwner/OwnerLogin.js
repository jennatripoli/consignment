import { useNavigate, useLocation } from 'react-router-dom'
import { header, ownerLogin } from '../Layout'
import { useState } from 'react'

export default function OwnerLogin() {
    // Route navigation.
    const navigate = useNavigate()
    // The input for the username.
    const [username, setUsername] = useState('')
    // The input for the password.
    const [password, setPassword] = useState('')
    // The confirmation text that will indicate failure to log in.
    const [confirmation, setConfirmation] = useState(undefined)
    // Store name from parameter.
    const { storeName } = useLocation().state

    /** Log in to the store with the entered credentials. */
    async function handleButtonLogin() {
        setConfirmation('Logging in, please wait.')
        try {
            let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/store', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    storeName: storeName,
                    type: 'login'
                })
            })
            if (resp.status === 200) navigate('/OwnerViewStore/' + storeName)
            else setConfirmation('Incorrect username or password.')
        } catch (e) {
            console.log(e)
            setConfirmation('Login attempt failed.')
        }
    }

    return (
        <div className='OwnerLogin'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>
            <div style={ownerLogin}>
                <div style={ownerLogin.title}>-- {storeName} LOGIN --</div>
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