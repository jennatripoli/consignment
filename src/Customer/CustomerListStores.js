import { Link, useNavigate } from 'react-router-dom'
import { customerListStores, header } from '../Layout'
import CustomerGPSContext from './CustomerGPSContext'
import { useContext, useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'


function CustomerListStores() {
    // Route navigation.
    const navigate = useNavigate()

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    
    useEffect(() => {
        console.log(customerGPS);
        setCustomerGPS([coords?.latitude, coords?.longitude])
    }, [coords])
    
    
    // List of all stores.
    const [stores, setStores] = useState([])

    async function retrieve() {
        let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/store', {
            method: 'GET'
        })
        let json = await resp.json()
        setStores(json)
    }

    useEffect(() => { retrieve() }, [])

    /** Go to CustomerViewInventory if GPS is set, otherwise go to CustomerSetGPS. */
    function handleButtonViewAll() {
        if (customerGPS[0] !== null && customerGPS[1] !== null) navigate('/CustomerViewInventory')
        else navigate('/CustomerSetGPS', { state: { destination: '/CustomerViewInventory' } })
    }

    function handleButtonViewStore(storeName) {
        if (customerGPS[0] !== null && customerGPS[1] !== null) navigate(`/CustomerViewInventory/${storeName}`, { state: { store: storeName } })
        else navigate('/CustomerSetGPS', { state: { destination: `/CustomerViewInventory/${storeName}`, store: storeName } })
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
                <div style={customerListStores.stores}>{stores.map((store) => <button key={store.storeName} onClick={() => handleButtonViewStore(store.storeName)} style={customerListStores.buttonStore} className='Button-dark'>{store.storeName}</button>)}</div>
            </div>
        </div>
    )
}

export default CustomerListStores