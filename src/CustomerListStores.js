import { Link, useNavigate } from "react-router-dom"
import { customerListStores, header } from "./Layout"
import CustomerGPSContext from "./CustomerGPSContext"
import React, { useContext } from "react"

function CustomerListStores(props) {
    const navigate = useNavigate()
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    // Boolean to indicate if data is retrieved.
    const [retrieved, setRetreived] = React.useState(false)
    // List of all stores.
    const [stores, setStores] = React.useState([])
    // HTML to display the list of all stores.
    const [storesHTML, setStoresHTML] = React.useState([])

    retrieve()
    function retrieve() {
        if (retrieved) return
        else setRetreived(true)

        // FOR TESTING
        setStores(['Store 1', 'Store 2', 'Store 3', 'Store 4'])
    }

    // Update storesHTML when stores changes.
    React.useEffect(() => {
        storesHTML.length = 0
        stores.forEach(store => {
            const entry = (<button key={store} style={customerListStores.buttonStore} className='Button-dark'>{store}</button>)
            storesHTML.push(entry)
        })
        setStoresHTML([].concat(storesHTML))
    }, [stores])

    /** Go to CustomerViewAll if GPS is set, otherwise go to CustomerSetGPS. */
    function handleButtonViewAll() {
        console.log(props.history)
        if (customerGPS.length > 0) navigate('/CustomerViewAll')
        else navigate('/CustomerSetGPS')
    }

    return (
        <div className='CustomerListStores'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <Link to='/SiteManagerLogin'><button style={header.buttonRight} className='Button-light'>Manage Site</button></Link>
                <Link to='/OwnerCreateStore'><button style={header.buttonMiddle} className='Button-light'>Create Store</button></Link>
                <Link to='/CustomerSetGPS'><button style={header.buttonLeft} className='Button-light'>Set GPS</button></Link>
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