import { header } from './Layout'

export default function OwnerLogin() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmation, setConfirmation] = React.useState(undefined)

    // ADD RETRIEVING THE STORE NAME

    function handleButtonBack() {
        setCurrentPageName(previousPageName)
    }

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
            setCurrentPageName('OwnerViewStore')

            /*instance.post('/ownerLogin', data).then((response) => {
              if (response.status === 200) {
                setCurrentPageName('OwnerViewStore')
              } else setConfirmation('Invalid credentials.')
            })*/
        } else setConfirmation('Invalid credentials.')
    }

    return (
        <div className='OwnerLogin'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={handleButtonBack} style={header.buttonRight} className='Button-light'>Back</button>
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
