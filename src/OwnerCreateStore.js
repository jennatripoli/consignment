import { useState } from "react"
import { header, ownerCreateStore } from "./Layout"
import { useNavigate } from "react-router-dom"

export default function OwnerCreateStore() {
  const navigate = useNavigate()
  // The input for the store name.
  const [storeName, setStoreName] = useState('')
  // The input for the store username.
  const [username, setUsername] = useState('')
  // The input for the store password.
  const [password, setPassword] = useState('')
  // The input for the store longitude.
  const [longitude, setLongitude] = useState('')
  // The input for the store latitude.
  const [latitude, setLatitude] = useState('')
  // The confirmation text that will indicate failure to create.
  const [confirmation, setConfirmation] = useState(undefined)

  /** Create a store with input data. */
  function handleButtonCreate() {
    setStoreName(document.getElementById('storeName').value)
    setUsername(document.getElementById('username').value)
    setPassword(document.getElementById('password').value)
    setLongitude(document.getElementById('longitude').value)
    setLatitude(document.getElementById('latitude').value)

    if (storeName && username && password && longitude && latitude) {
      // FOR TESTING
      navigate('/OwnerViewStore')
      // setConfirmation('Failed to create store, please choose a unique store name.')
    } else setConfirmation('Failed to create store, please fill in all fields.')
  }

  return (
    <div className='OwnerCreateStore'>
      <div style={header}>
        <div style={header.title}>Used Computers</div>
        <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
        <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
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
    </div >
  )
}