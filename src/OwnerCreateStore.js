

export default function OwnerCreateStore() {
  const [storeName, setStoreName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [longitude, setLongitude] = React.useState('')
  const [latitude, setLatitude] = React.useState('')
  const [confirmation, setConfirmation] = React.useState(undefined)

  function handleButtonBack() {
    setCurrentPageName(previousPageName)
  }

  function handleButtonCreate() {
    setStoreName(document.getElementById('storeName').value)
    setUsername(document.getElementById('username').value)
    setPassword(document.getElementById('password').value)
    setLongitude(document.getElementById('longitude').value)
    setLatitude(document.getElementById('latitude').value)

    if (storeName && username && password && longitude && latitude)
    {
      const msg = {}
      msg['storeName'] = storeName
      msg['username'] = username
      msg['password'] = password
      msg['longitude'] = longitude
      msg['latitude'] = latitude
      const data = { 'body': JSON.stringify(msg) }

      // FOR TESTING
      setCurrentPageName('OwnerViewStore')

      /*instance.post('/ownerCreateStore', data).then((response) => {
        if (response.status === 200) {
          setCurrentPageName('OwnerViewStore')
        } else setConfirmation('Failed to create store, please choose a unique store name.')
      })*/
    } else setConfirmation('Failed to create store, please fill in all fields.')
  }

  return (
    <div className='OwnerCreateStore'>
      <div style={header}>
        <div style={header.title}>Used Computers</div>
        <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
        <button onClick={handleButtonBack} style={header.buttonRight} className='Button-light'>Back</button>
      </div>

      <div style={ownerCreateStore}>
        <div style={ownerCreateStore.title}>-- CREATE A STORE --</div>
        <div style={ownerCreateStore.store}>
          <label>Store Name:&emsp;</label>
          <input id='storeName' type='text' value={storeName} onChange={e => setStoreName(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
          <br /><br />
          <label>Username:&emsp;&nbsp;&nbsp;&nbsp;</label>
          <input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
          <br /><br />
          <label>Password:&emsp;&emsp;</label>
          <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
          <br /><br />
          <label>Longitude:&emsp;&nbsp;&nbsp;</label>
          <input id='longitude' type='number' value={longitude} onChange={e => setLongitude(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
          <br /><br />
          <label>Latitude:&emsp;&emsp;&nbsp;</label>
          <input id='latitude' type='number' value={latitude} onChange={e => setLatitude(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
        </div>
        <button onClick={handleButtonCreate} style={ownerCreateStore.button} className='Button-light'>Create</button><br />
        <label>{confirmation}</label>
      </div>
    </div>
  )
}