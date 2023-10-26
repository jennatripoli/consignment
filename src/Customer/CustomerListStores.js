import { Link, useNavigate } from 'react-router-dom'
import { customerListStores, header } from '../Layout'
import CustomerGPSContext from './CustomerGPSContext'
import { useContext, useEffect, useState } from 'react'


function CustomerListStores() {
    // Route navigation.
    const navigate = useNavigate()
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    // List of all stores.
    const [stores, setStores] = useState([])
    // HTML to display the list of all stores.
    const [storesHTML, setStoresHTML] = useState([])

    async function retrieve() {
        let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/store', {
            method: 'GET'
        })
        let json = await resp.json()
        console.log(json);
        setStores(json)
    }

    useEffect(() => { retrieve() }, [])
    console.log(stores);

    // // Update storesHTML when stores changes.
    // useEffect(() => {
    //     storesHTML.length = 0
    //     stores.forEach(store => {
    //         const entry = (<button key={store} onClick={() => handleButtonViewStore(store)} style={customerListStores.buttonStore} className='Button-dark'>{store}</button>)
    //         storesHTML.push(entry)
    //     })
    //     setStoresHTML([].concat(storesHTML))
    // }, [stores])

    /** Go to CustomerViewInventory if GPS is set, otherwise go to CustomerSetGPS. */
    function handleButtonViewAll() {
        if (customerGPS[0].length + customerGPS[1].length > 0) navigate('/CustomerViewInventory', { state: { store: '' } })
        else navigate('/CustomerSetGPS', { state: { destination: '/CustomerViewInventory', store: '' } })
    }

    function handleButtonViewStore(storeName) {
        if (customerGPS[0].length + customerGPS[1].length > 0) navigate(`/CustomerViewInventory/${storeName}`, { state: { store: storeName } })
        else navigate('/CustomerSetGPS', { state: { destination: '/CustomerViewInventory', store: storeName } })
    }

    return (
        <div className='CustomerListStores'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <Link to='/SiteManagerLogin'><button style={header.buttonRight} className='Button-light'>Manage Site</button></Link>
                <Link to='/OwnerCreateStore'><button style={header.buttonMiddle} className='Button-light'>Create Store</button></Link>
                <Link to='/CustomerSetGPS' state={{ destination: '/CustomerSetGPS' }}><button style={header.buttonLeft} className='Button-light'>Set GPS</button></Link>
            </div>

            <div style={customerListStores}>
                <div style={customerListStores.title}>-- ALL STORES --</div>
                <button onClick={handleButtonViewAll} style={customerListStores.buttonInventory} className='Button-light'>View Inventory on Entire Site</button>
                <div style={customerListStores.stores}>{stores.map((store) => <button key={store} onClick={() => handleButtonViewStore(store)} style={customerListStores.buttonStore} className='Button-dark'>{store}</button>)}</div>
            </div>
        </div>
    )
}

export default CustomerListStores