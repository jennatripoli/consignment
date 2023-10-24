import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { header, siteManagerLogin } from "./Layout"

export default function SiteManagerLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState(undefined)
    const navigate = useNavigate()

    // function handleButtonBack() {
    //     setCurrentPageName(previousPageName)
    // }

    function handleButtonLogin() {
        setUsername(document.getElementById('username').value)
        setPassword(document.getElementById('password').value)

        if (username && password)
        {
            const msg = {}
            msg['username'] = username
            msg['password'] = password
            const data = { 'body': JSON.stringify(msg) }

            // FOR TESTING
            navigate('/SiteManagerListStores')

            /*instance.post('/siteManagerLogin', data).then((response) => {
              if (response.status === 200) {
                setCurrentPageName('SiteManagerListStores')
              } else setConfirmation('Invalid credentials.')
            })*/
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