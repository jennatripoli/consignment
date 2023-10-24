import './App.css'
import { header, customerListStores, customerSetGPS, customerViewAll, siteManagerLogin, siteManagerListStores, ownerCreateStore, ownerLogin } from './Layout.js'
import React, { useState } from 'react'

// const instance = axios.create({ baseURL: 'URL' })

function App() {
  const [currentPage, setCurrentPage] = React.useState(<CustomerListStores/>)
  const [currentPageName, setCurrentPageName] = React.useState('CustomerListStores')
  const [previousPageName, setPreviousPageName] = React.useState('CustomerListStores')
  const [destinationPageName, setDestinationPageName] = React.useState('')
  const [customerGPS, setCustomerGPS] = React.useState([33.9727, -118.3507])

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
    const stores = ['Store 1', 'Store 2', 'Store 3', 'Store 4']
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
      }
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

    function handleButtonViewAll() {
      console.log(customerGPS)
      if (customerGPS.length > 0) setCurrentPageName('CustomerViewAll')
      else {
        setCurrentPageName('CustomerSetGPS')
        setDestinationPageName('CustomerViewAll')
      }
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
          <button onClick={handleButtonViewAll} style={customerListStores.buttonInventory} className='Button-light'>View Inventory on Entire Site</button>
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
    const [retrieved, setRetreived] = React.useState(false)
    const [allInventory, setAllInventory] = React.useState([])
    const [inventory, setInventory] = React.useState([])
    const [inventoryHTML, setInventoryHTML] = React.useState([])
    const [price, setPrice] = React.useState([[2001, NaN], [1501, 2000], [1001, 1500], [501, 1000], [0, 500]])
    const [memory, setMemory] = React.useState(['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB'])
    const [storage, setStorage] = React.useState(['2 TB', '1 TB', '512 GB', '256 GB', '128 GB'])
    const [processor, setProcessor] = React.useState(['Intel', 'AMD', 'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7'])
    const [processorGen, setProcessorGen] = React.useState(['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series'])
    const [graphics, setGraphics] = React.useState(['NVIDIA', 'AMD', 'Intel', 'NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770'])

    retrieve()
    function retrieve() {
      if (retrieved) return
      else setRetreived(true)

      // FOR TESTING
      setAllInventory([
      {storeName: 'Store1', longitude: 100, latitude: 100, id: 1, name: 'Computer1', price: 100, memory: '1 GB', storage: '128 GB', processor: 'Intel Xeon', processorGen: '11th Gen Intel', graphics: 'Intel Integrated Graphics'}, 
      {storeName: 'Store1', longitude: 400, latitude: 200, id: 2, name: 'Computer2', price: 1600, memory: '8 GB', storage: '512 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'NVIDIA GeForce RTX 4090'}, 
      {storeName: 'Store1',  longitude: 700, latitude: 600, id: 3, name: 'Computer3', price: 600, memory: '32 GB', storage: '2 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'NVIDIA GeForce RTX 4080'}, 
      {storeName: 'Store2',  longitude: 1000, latitude: 1000, id: 4, name: 'Computer4', price: 200, memory: '4 GB', storage: '256 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'Intel UHD Graphics 730'}, 
      {storeName: 'Store3',  longitude: 500, latitude: 800, id: 5, name: 'Computer5', price: 400, memory: '12 GB', storage: '512 GB', processor: 'AMD Ryzen 7', processorGen: 'AMD Ryzen 6000 Series', graphics: 'AMD Radeon Pro W6400'}, 
      {storeName: 'Store4',  longitude: 1000, latitude: 900, id: 6, name: 'Computer6', price: 1050, memory: '16 GB', storage: '1 TB', processor: 'AMD Ryzen 9', processorGen: 'AMD Ryzen 7000 Series', graphics: 'AMD Radeon Pro W6300'},
      {storeName: 'Store4',  longitude: 300, latitude: 100, id: 7, name: 'Computer7', price: 2050, memory: '32 GB', storage: '1 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'Intel UHD Graphics 770'}])

      /*instance.get('/customerViewAll').then((response) => {
        if (response.status === 200) {
          setAllInventory(response)
        }
      })*/
    }
    
    React.useEffect (() => {
      const computersToRemove = []
      allInventory.forEach(computer => {
        let flag = false
        price.forEach(filter => {
          if (computer.price >= filter[0]) {
            if (!isNaN(filter[1]) && computer.price <= filter[1]) flag = true
            else if (isNaN(filter[1])) flag = true
          }
        })
        if (!flag) computersToRemove.push(computer.id)

        flag = false
        memory.forEach(filter => { if (computer.memory.includes(filter)) flag = true })
        if (!flag) computersToRemove.push(computer.id)

        flag = false
        storage.forEach(filter => { if (computer.storage.includes(filter)) flag = true })
        if (!flag) computersToRemove.push(computer.id)

        flag = false
        processor.forEach(filter => { if (computer.processor.includes(filter)) flag = true })
        if (!flag) computersToRemove.push(computer.id)

        flag = false
        processorGen.forEach(filter => { if (computer.processorGen.includes(filter)) flag = true })
        if (!flag) computersToRemove.push(computer.id)

        flag = false
        graphics.forEach(filter => { if (computer.graphics.includes(filter)) flag = true })
        if (!flag) computersToRemove.push(computer.id)
      })
      removeComputers(computersToRemove)
    }, [price, memory, storage, processor, processorGen, graphics])

    React.useEffect (() => {
      inventoryHTML.length = 0
      inventory.forEach(computer => {
        // TODO ADD SHIPPING CALCULATION
        const shipping = 1000.23

        const entry = (
          <div key={computer.id}>
            <div style={customerViewAll.computer}>
              <div style={customerViewAll.left}><span style={{fontWeight: 'bold'}}>{computer.name}</span><br/><br/>Memory: {computer.memory}<br/>Storage Size: {computer.storage}<br/>Processor: {computer.processor}<br/>Processor Gen: {computer.processorGen}<br/>Graphics: {computer.graphics}</div>
              <div style={customerViewAll.right}><span style={{fontWeight: 'bold'}}>Total Price: ${computer.price + shipping}</span><br/><br/>Store: {computer.storeName}<br/>List Price: ${computer.price}<br/>Shipping: ${shipping}</div>
            </div>
            <button key={toString(computer.id).concat(' Compare')} style={customerViewAll.button} className='Button-light'>Compare</button>
            <button key={toString(computer.id).concat(' Purchase')} style={customerViewAll.button} className='Button-light'>Purchase</button>
          </div>
        )
        inventoryHTML.push(entry)
      })
      setInventoryHTML([].concat(inventoryHTML))
    }, [inventory])

    function removeComputers(ids) {
      const inventoryWithoutDeleted = []
      allInventory.forEach(computer => { if (!ids.includes(computer.id)) inventoryWithoutDeleted.push(computer) })
      setInventory([].concat(inventoryWithoutDeleted))
    }

    function handleFilter() {
      let priceFilter = [], memoryFilter = [], storageFilter = [], processorFilter = [], processorGenFilter = [], graphicsFilter = []

      document.getElementsByName('price').forEach(checkbox => { if (checkbox.checked) priceFilter.push([parseInt(checkbox.value.split(',')[0]), parseInt(checkbox.value.split(',')[1])]) })
      document.getElementsByName('memory').forEach(checkbox => { if (checkbox.checked) memoryFilter = memoryFilter.concat(checkbox.value.split(',')) })
      document.getElementsByName('storage').forEach(checkbox => { if (checkbox.checked) storageFilter = storageFilter.concat(checkbox.value.split(',')) })
      document.getElementsByName('processor').forEach(checkbox => { if (checkbox.checked) processorFilter.push(checkbox.value) })
      document.getElementsByName('processorGen').forEach(checkbox => { if (checkbox.checked) processorGenFilter.push(checkbox.value) })
      document.getElementsByName('graphics').forEach(checkbox => { if (checkbox.checked) graphicsFilter.push(checkbox.value) })

      if (priceFilter.length === 0) priceFilter = [[2001, NaN], [1501, 2000], [1001, 1500], [501, 1000], [0, 500]]
      if (memoryFilter.length === 0) memoryFilter = ['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB']
      if (storageFilter.length === 0) storageFilter = ['2 TB', '1 TB', '512 GB', '256 GB', '128 GB']
      if (processorFilter.length === 0) processorFilter = ['Intel', 'AMD', 'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7']
      if (processorGenFilter.length === 0) processorGenFilter = ['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series']
      if (graphicsFilter.length === 0) graphicsFilter = ['NVIDIA', 'AMD', 'Intel', 'NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770']

      setPrice(priceFilter)
      setMemory(memoryFilter)
      setStorage(storageFilter)
      setProcessor(processorFilter)
      setProcessorGen(processorGenFilter)
      setGraphics(graphicsFilter)
    }

    function handleButtonBack() {
      setCurrentPageName('CustomerListStores')
    }

    return (
      <div className='CustomerViewAll'>
        <div style={header}>
          <div style={header.title}>Used Computers</div>
          <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
          <button onClick={handleButtonBack} style={header.buttonRight} className='Button-light'>Back</button>
        </div>

        <div style={customerViewAll}>
          <div style={customerViewAll.title}>-- ALL SITE INVENTORY --</div>
          <div style={customerViewAll.filter}>
            <span style={{fontWeight: 'bold', textAlign: 'center', display: 'block'}}>SEARCH FILTERS</span>
            <span style={{fontWeight: 'bold'}}>List Price:</span><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='2001'></input> $2,001 or more</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='1501,2000'></input> $1,501 - $2,000</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='1001,1500'></input> $1,001 - $1,500</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='501,1000'></input> $501 - $1000</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='0,500'></input> $500 or less</label><br/>
            <br/><span style={{fontWeight: 'bold'}}>Memory:</span><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='32 GB'></input> 32 GB or more</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='16 GB'></input> 16 GB</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='8 GB'></input> 8 GB</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='4 GB,1 GB'></input> 4 GB or less</label><br/>
            <br/><span style={{fontWeight: 'bold'}}>Storage Size:</span><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='2 TB'></input> 2 TB or more</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='1 TB'></input> 1 TB</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='512 GB'></input> 512 GB</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='256 GB,128 GB'></input> 256 GB or less</label><br/>
            <br/><span style={{fontWeight: 'bold'}}>Processor:</span><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel'></input> All Intel Processors</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='AMD'></input> All AMD Processors</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel Xeon'></input> Intel Xeon</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel i9'></input> Intel i9</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel i7'></input> Intel i7</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='AMD Ryzen 9'></input> AMD Ryzen 9</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='AMD Ryzen 7'></input> AMD Ryzen 7</label><br/>
            <br/><span style={{fontWeight: 'bold'}}>Processor Gen:</span><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='13th Gen Intel'></input> 13th Gen Intel</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='12th Gen Intel'></input> 12th Gen Intel</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='11th Gen Intel'></input> 11th Gen Intel</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='AMD Ryzen 7000 Series'></input> AMD Ryzen 7000 Series</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='AMD Ryzen 6000 Series'></input> AMD Ryzen 6000 Series</label><br/>
            <br/><span style={{fontWeight: 'bold'}}>Graphics:</span><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='NVIDIA'></input> All NVIDIA Graphics</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='AMD'></input> All AMD Graphics</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel'></input> All Intel Graphics</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='NVIDIA GeForce RTX 4090'></input> NVIDIA GeForce RTX 4090</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='NVIDIA GeForce RTX 4080'></input> NVIDIA GeForce RTX 4080</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='AMD Radeon Pro W6300'></input> AMD Radeon Pro W6300</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='AMD Radeon Pro W6400'></input> AMD Radeon Pro W6400</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel Integrated Graphics'></input> Intel Integrated Graphics</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel UHD Graphics 730'></input> Intel UHD Graphics 730</label><br/>
            <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel UHD Graphics 770'></input> Intel UHD Graphics 770</label>
          </div>
          <div id='inventory' style={customerViewAll.inventory}>{inventoryHTML}</div>
        </div>
      </div>
    )
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
    const [retrieved, setRetreived] = React.useState(false)
    const [stores, setStores] = React.useState([])
    const [storesHTML, setStoresHTML] = React.useState([])
    const [sort, setSort] = React.useState('')

    retrieve()
    function retrieve() {
      if (retrieved) return
      else setRetreived(true)

      // FOR TESTING
      setStores([{storeName: 'Store1', inventory: 300, balance: 300}, {storeName: 'Store2', inventory: 500, balance: 100}, {storeName: 'Store3', inventory: 200, balance: 400}, {storeName: 'Store4', inventory: 100, balance: 500}])
      setSort('ascending')

      /*instance.get('/siteManagerListStores').then((response) => {
        if (response.status === 200) {
          setStores(response)
          setSort('ascending')
        }
      })*/
    }
    
    React.useEffect (() => {
      if (sort === 'ascending') {
        document.getElementById('ascending').checked = true
        document.getElementById('descending').checked = false
        setStores([].concat(stores).sort((a, b) => b.inventory - a.inventory))
      } else if (sort === 'descending') {
        document.getElementById('descending').checked = true
        document.getElementById('ascending').checked = false
        setStores([].concat(stores).sort((a, b) => a.inventory - b.inventory))
      }
    }, [sort])

    React.useEffect(() => {
      storesHTML.length = 0
      stores.forEach(store => {
        const entry = (
          <div key={store.storeName}>
            <div style={siteManagerListStores.store}><span style={{fontWeight: 'bold'}}>{store.storeName}<br/>Inventory: </span>${store.inventory}<br/><span style={{fontWeight: 'bold'}}>Balance: </span>${store.balance}</div>
            <button key={store.storeName.concat(' Button')} onClick={() => handleButtonDelete(store.storeName)} style={siteManagerListStores.button} className='Button-white'><svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg></button>
          </div>
        )
        storesHTML.push(entry)
      })
      setStoresHTML([].concat(storesHTML))
    }, [stores])

    function handleButtonLogout() {
      setCurrentPageName('CustomerListStores')
    }

    function handleButtonDelete(storeNameDelete) {
      // FOR TESTING
      const storesWithoutDeleted = []
      stores.forEach(store => { if (store.storeName !== storeNameDelete) storesWithoutDeleted.push(store) })
      setStores([].concat(storesWithoutDeleted))

      const msg = {}
      msg['storeName'] = storeNameDelete
      const data = { 'body': JSON.stringify(msg) }

      /*instance.post('/siteManagerDeleteStore', data).then((response) => {
        if (response.status === 200) {
          setStores(response)
        }
      })*/
    }

    function handleSort() {
      if (document.getElementById('ascending').checked) setSort('ascending')
      else if (document.getElementById('descending').checked) setSort('descending')
    }

    return (
      <div className='SiteManagerListStores'>
        <div style={header}>
          <div style={header.title}>Used Computers</div>
          <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
          <button onClick={handleButtonLogout} style={header.buttonRight} className='Button-light'>Logout</button>
        </div>
  
        <div style={siteManagerListStores}>
          <div style={siteManagerListStores.title}>-- ALL STORES --</div>
          <div style={siteManagerListStores.sort}><span style={{fontWeight: 'bold'}}>Sort Inventory:</span>&emsp;
            <label><input type='radio' className='Radio' id='ascending' name='sort' value='ascending' onChange={handleSort}></input>Ascending</label>&emsp;
            <label><input type='radio' className='Radio' id='descending' name='sort' value='ascending' onChange={handleSort}></input>Descending</label>
          </div>
          <div id='stores' style={siteManagerListStores.stores}>{storesHTML}</div>
        </div>
      </div>
    )
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
            <input id='storeName' type='text' value={storeName} onChange={e => setStoreName(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
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
