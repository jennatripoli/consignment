import './App.css'
import { header, customerListStores, customerSetGPS, siteManagerLogin, ownerCreateStore, ownerLogin } from './Layout.js'
import React, { useState } from 'react'

// const instance = axios.create({ baseURL: 'URL' })

function App() {
  const [currentPage, setCurrentPage] = React.useState(<CustomerListStores/>)
  const [currentPageName, setCurrentPageName] = React.useState('CustomerListStores')
  const [previousPageName, setPreviousPageName] = React.useState('CustomerListStores')
  const [destinationPageName, setDestinationPageName] = React.useState('CustomerListStores')
  const [customerGPS, setCustomerGPS] = React.useState(['', ''])

  React.useEffect (() => {
    if (currentPageName === 'CustomerListStores') setCurrentPage(<CustomerListStores/>)
    else if (currentPageName === 'CustomerSetGPS') setCurrentPage(<CustomerSetGPS/>)
    else if (currentPageName === 'CustomerViewStore') setCurrentPage(<CustomerViewStore/>)
    else if (currentPageName === 'CustomerViewAll') setCurrentPage(<CustomerViewAll/>)
    else if (currentPageName === 'CustomerCompare') setCurrentPage(<CustomerCompare/>)

    else if (currentPageName === 'SiteManagerLogin') setCurrentPage(<SiteManagerLogin/>)
    else if (currentPageName === 'SiteManagerListStores') setCurrentPage(<SiteManagerListStores/>)

    else if (currentPageName === 'OwnerCreateStore') setCurrentPage(<OwnerCreateStore/>)
    else if (currentPageName === 'OwnerLogin') setCurrentPage(<OwnerLogin/>)
    else if (currentPageName === 'OwnerViewStore') setCurrentPage(<OwnerViewStore/>)
    else if (currentPageName === 'OwnerAddComputer') setCurrentPage(<OwnerAddComputer/>)
    else if (currentPageName === 'OwnerEditPrice') setCurrentPage(<OwnerEditPrice/>)

    if (currentPageName !== previousPageName) setPreviousPageName(currentPageName)
  }, [currentPageName])

  function CustomerListStores() {
    const storesHTML = []

    // FOR TESTING
    const stores = ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5']
    stores.forEach(store => {
      const entry = (<button key={store} style={customerListStores.buttonStore} className='Button-dark'>{store}</button>)
      storesHTML.push(entry)
    })

    /*instance.get('/customerListStores').then((response) => {
      if (response.status === 200) {
        response.stores.forEach(store => {
          const entry = (<button key={store} style={customerListStores.buttonStore} className='Button-dark'>{store}</button>)
          storesHTML.push(entry)
        })
      } else console.log('Unable to list stores.')
    })*/

    function handleButtonLogin() {
      setCurrentPageName('SiteManagerLogin')
    }

    function handleButtonCreate() {
      setCurrentPageName('OwnerCreateStore')
    }

    function handleButtonGPS() {
      setCurrentPageName('CustomerSetGPS')
      setDestinationPageName('CustomerSetGPS')
    }
  
    return (
      <div className='CustomerListStores'>
        <div style={header}>
          <div style={header.title}>Used Computers</div>
          <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
          <button onClick={handleButtonLogin} style={header.buttonRight} className='Button-light'>Manage Site</button>
          <button onClick={handleButtonCreate} style={header.buttonMiddle} className='Button-light'>Create Store</button>
          <button onClick={handleButtonGPS} style={header.buttonLeft} className='Button-light'>Set GPS</button>
        </div>
  
        <div style={customerListStores}>
          <div style={customerListStores.title}>-- ALL STORES --</div>
          <button style={customerListStores.buttonInventory} className='Button-light'>View Inventory on Entire Site</button>
          <div style={customerListStores.stores}>{storesHTML}</div>
        </div>
      </div>
    )
  }

  function CustomerSetGPS() {
    const [longitude, setLongitude] = React.useState(customerGPS[0])
    const [latitude, setLatitude] = React.useState(customerGPS[1])
    const [confirmation, setConfirmation] = React.useState(undefined)

    function handleButtonBack() {
      setCurrentPageName(previousPageName)
    }

    function handleButtonSave() {
      setLongitude(document.getElementById('longitude').value)
      setLatitude(document.getElementById('latitude').value)

      if (longitude && latitude) {
        setCustomerGPS([longitude, latitude])
        setConfirmation('Save Successful!')

        if (destinationPageName !== currentPageName) {
          setTimeout(2000)
          setCurrentPageName(destinationPageName)
        }
      } else setConfirmation('Failed to save GPS, please fill in all fields.')
    }

    return (
      <div className='CustomerSetGPS'>
        <div style={header}>
          <div style={header.title}>Used Computers</div>
          <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
          <button onClick={handleButtonBack} style={header.buttonRight} className='Button-light'>Back</button>
        </div>
  
        <div style={customerSetGPS}>
          <div style={customerSetGPS.title}>-- SET GPS LOCATION --</div>
          <div style={customerSetGPS.gps}>
            <label>Longitude:&emsp;</label>
            <input id='longitude' type='number' value={longitude} onChange={e => setLongitude(e.target.value)} style={customerSetGPS.entry} className='Entry-light'></input>
            <br/><br/>
            <label>Latitude:&emsp;&nbsp;&nbsp;&nbsp;</label>
            <input id='latitude' type='number' value={latitude} onChange={e => setLatitude(e.target.value)} style={customerSetGPS.entry} className='Entry-light'></input>
          </div>
          <button onClick={handleButtonSave} style={customerSetGPS.button} className='Button-light'>Save</button><br/>
          <label>{confirmation}</label>
        </div>
      </div>
    )
  }

  function CustomerViewStore() {
  }

  function CustomerViewAll() {
  }  

  function CustomerCompare() {
  }
  
  function SiteManagerLogin() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmation, setConfirmation] = React.useState(undefined)

    function handleButtonBack() {
      setCurrentPageName(previousPageName)
    }

    function handleButtonLogin() {
      setUsername(document.getElementById('username').value)
      setPassword(document.getElementById('password').value)

      if (username && password) {
        const msg = {}
        msg['username'] = username
        msg['password'] = password
        const data = { 'body': JSON.stringify(msg) }

        // FOR TESTING
        setCurrentPageName('SiteManagerListStores')

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
          <button onClick={handleButtonBack} style={header.buttonRight} className='Button-light'>Back</button>
        </div>
  
        <div style={siteManagerLogin}>
          <div style={siteManagerLogin.title}>-- SITE MANAGER LOGIN --</div>
          <div style={siteManagerLogin.login}>
            <label>Username:&emsp;</label>
            <input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} style={siteManagerLogin.entry} className='Entry-light'></input>
            <br/><br/>
            <label>Password:&emsp;&nbsp;</label>
            <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} style={siteManagerLogin.entry} className='Entry-light'></input>
          </div>
          <button onClick={handleButtonLogin} style={siteManagerLogin.button} className='Button-light'>Log In</button><br/>
          <label>{confirmation}</label>
        </div>
      </div>
    )
  }

  function SiteManagerListStores() {
  }

  function OwnerCreateStore() {
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

      if (storeName && username && password && longitude && latitude) {
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
            <input id='store-name' type='text' value={storeName} onChange={e => setStoreName(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
            <br/><br/>
            <label>Username:&emsp;&nbsp;&nbsp;&nbsp;</label>
            <input id='username' type='text' value={username} onChange={e => setUsername(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
            <br/><br/>
            <label>Password:&emsp;&emsp;</label>
            <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
            <br/><br/>
            <label>Longitude:&emsp;&nbsp;&nbsp;</label>
            <input id='longitude' type='number' value={longitude} onChange={e => setLongitude(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
            <br/><br/>
            <label>Latitude:&emsp;&emsp;&nbsp;</label>
            <input id='latitude' type='number' value={latitude} onChange={e => setLatitude(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
          </div>
          <button onClick={handleButtonCreate} style={ownerCreateStore.button} className='Button-light'>Create</button><br/>
          <label>{confirmation}</label>
        </div>
      </div>
    )
  }

  function OwnerLogin() {
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

      if (username && password) {
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
            <br/><br/>
            <label>Password:&emsp;&nbsp;</label>
            <input id='password' type='password' value={password} onChange={e => setPassword(e.target.value)} style={ownerLogin.entry} className='Entry-light'></input>
          </div>
          <button onClick={handleButtonLogin} style={ownerLogin.button} className='Button-light'>Log In</button><br/>
          <label>{confirmation}</label>
        </div>
      </div>
    )
  }

  function OwnerViewStore() {
  }

  function OwnerAddComputer() {
  }

  function OwnerEditPrice() {
  }

  return (
    <div className='App'>{currentPage}</div>
  )
}

export default App
