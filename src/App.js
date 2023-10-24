import './App.css'
import { header, customerListStores, customerSetGPS, customerViewAll, siteManagerLogin, siteManagerListStores, ownerCreateStore, ownerLogin } from './Layout.js'
import React, { createContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomerListStores, CustomerSetGPS, CustomerViewStore, CustomerViewAll, CustomerCompare } from './CustomerViews'
import { SiteManagerLogin, SiteManagerListStores } from './SiteManagerViews'
import { OwnerCreateStore, OwnerLogin, OwnerViewStore, OwnerAddComputer, OwnerEditPrice } from './OwnerViews'
import CustomerGPSProvider from './CustomerGPSProvider';
import Home from './Home'

// const instance = axios.create({ baseURL: 'URL' })

function App() {
  // const [currentPage, setCurrentPage] = React.useState(<CustomerListStores />)
  // const [currentPageName, setCurrentPageName] = React.useState('CustomerListStores')
  // const [previousPageName, setPreviousPageName] = React.useState('CustomerListStores')
  // const [destinationPageName, setDestinationPageName] = React.useState('')
  const [customerGPS, setCustomerGPS] = useState([33.9727, -118.3507])

  // React.useEffect(() => {
  //   if (currentPageName === 'CustomerListStores') setCurrentPage()
  //   else if (currentPageName === 'CustomerSetGPS') setCurrentPage(<CustomerSetGPS />)
  //   else if (currentPageName === 'CustomerViewStore') setCurrentPage(<CustomerViewStore />)
  //   else if (currentPageName === 'CustomerViewAll') setCurrentPage(<CustomerViewAll />)
  //   else if (currentPageName === 'CustomerCompare') setCurrentPage(<CustomerCompare />)

  //   else if (currentPageName === 'SiteManagerLogin') setCurrentPage(<SiteManagerLogin />)
  //   else if (currentPageName === 'SiteManagerListStores') setCurrentPage(<SiteManagerListStores />)

  //   else if (currentPageName === 'OwnerCreateStore') setCurrentPage(<OwnerCreateStore />)
  //   else if (currentPageName === 'OwnerLogin') setCurrentPage(<OwnerLogin />)
  //   else if (currentPageName === 'OwnerViewStore') setCurrentPage(<OwnerViewStore />)
  //   else if (currentPageName === 'OwnerAddComputer') setCurrentPage(<OwnerAddComputer />)
  //   else if (currentPageName === 'OwnerEditPrice') setCurrentPage(<OwnerEditPrice />)

  //   if (currentPageName !== previousPageName) setPreviousPageName(currentPageName)
  // }, [currentPageName])

  return (
    // <div className='App'>{currentPage}</div>
    <CustomerGPSProvider>
      <Router>
        <Routes>
          <Route path='/' element={<CustomerListStores />} />
          <Route path='/CustomerListStores' element={<CustomerListStores />} />
          <Route path='/CustomerSetGPS' element={<CustomerSetGPS />} />
          <Route path='/CustomerViewStore' element={<CustomerViewStore />} />
          <Route path='/CustomerViewAll' element={<CustomerViewAll />} />
          <Route path='/CustomerCompare' element={<CustomerCompare />} />

          <Route path='/SiteManagerLogin' element={<SiteManagerLogin />} />
          <Route path='/SiteManagerListStores' element={<SiteManagerListStores />} />

          <Route path='/OwnerCreateStore' element={<OwnerCreateStore />} />
          <Route path='/OwnerLogin' element={<OwnerLogin />} />
          <Route path='/OwnerViewStore' element={<OwnerViewStore />} />
          <Route path='/OwnerAddComputer' element={<OwnerAddComputer />} />
          <Route path='/OwnerEditPrice' element={<OwnerEditPrice />} />
        </Routes>
      </Router>
    </CustomerGPSProvider>
  )
}

export default App
