export default function CustomerListStores() {
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
        else
        {
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