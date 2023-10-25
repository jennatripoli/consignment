import { Link, useNavigate } from 'react-router-dom'
import { customerListStores, header } from './Layout'
import CustomerGPSContext from './CustomerGPSContext'
import { useContext, useEffect, useState } from 'react'

function retrieve() {
    // FOR TESTING
    return ['Store 1', 'Store 2', 'Store 3', 'Store 4']
}

function CustomerListStores(props) {
    // Route navigation.
    const navigate = useNavigate()
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    // List of all stores.
    const [stores, setStores] = useState(retrieve())
    // HTML to display the list of all stores.
    const [storesHTML, setStoresHTML] = useState([])

    // Update storesHTML when stores changes.
    useEffect(() => {
        storesHTML.length = 0
        stores.forEach(store => {
            const entry = (<button key={store} style={customerListStores.buttonStore} className='Button-dark'>{store}</button>)
            storesHTML.push(entry)
        })
        setStoresHTML([].concat(storesHTML))
    }, [stores])

    /** Go to CustomerViewInventory if GPS is set, otherwise go to CustomerSetGPS. */
    function handleButtonViewAll() {
        if (customerGPS.length > 0) navigate('/CustomerViewInventory')
        else navigate('/CustomerSetGPS', { state: {destination: '/CustomerViewInventory'}, replace: true })
    }

    return (
        <div className='CustomerListStores'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <Link to='/SiteManagerLogin'><button style={header.buttonRight} className='Button-light'>Manage Site</button></Link>
                <Link to='/OwnerCreateStore'><button style={header.buttonMiddle} className='Button-light'>Create Store</button></Link>
                <Link to='/CustomerSetGPS' state={{destination: '/CustomerSetGPS'}}><button style={header.buttonLeft} className='Button-light'>Set GPS</button></Link>
            </div>

            <div style={customerListStores}>
                <div style={customerListStores.title}>-- ALL STORES --</div>
                <button onClick={handleButtonViewAll} style={customerListStores.buttonInventory} className='Button-light'>View Inventory on Entire Site</button>
                <div style={customerListStores.stores}>{storesHTML}</div>
            </div>
        </div>
    )
}

export default CustomerListStores