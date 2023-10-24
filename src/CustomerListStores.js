import { Link, useNavigate } from "react-router-dom"
import { customerListStores, header } from "./Layout"
import CustomerGPSContext from "./CustomerGPSContext";
import { useContext } from "react";

function CustomerListStores(props) {
    const storesHTML = []
    const navigate = useNavigate()

    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext);


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

    // function handleButtonLogin() {
    //     setCurrentPageName('SiteManagerLogin')
    // }

    // function handleButtonCreate() {
    //     setCurrentPageName('OwnerCreateStore')
    // }

    // function handleButtonGPS() {
    //     setCurrentPageName('CustomerSetGPS')
    //     setDestinationPageName('CustomerSetGPS')
    // }

    function handleButtonViewAll() {
        console.log(props.history);
        if (customerGPS.length > 0)
        {
            navigate('/CustomerViewAll'); // Navigate to the 'CustomerViewAll' route
        } else
        {
            navigate('/CustomerSetGPS'); // Navigate to the 'CustomerSetGPS' route
        }
    }

    return (
        <div className='CustomerListStores'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <Link to='/SiteManagerLogin'>
                    <button style={header.buttonRight} className='Button-light'>Manage Site</button>
                </Link>
                <Link to='/OwnerCreateStore'>
                    <button style={header.buttonMiddle} className='Button-light'>Create Store</button>
                </Link>
                <Link to='/CustomerSetGPS'>
                    <button style={header.buttonLeft} className='Button-light'>Set GPS</button>
                </Link>
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