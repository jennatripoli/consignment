import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {useContext, useEffect} from 'react'
import { CustomerListStores, CustomerSetGPS, CustomerViewInventory, CustomerCompare } from './Customer/CustomerViews'
import { SiteManagerLogin, SiteManagerListStores } from './SiteManager/SiteManagerViews'
import { OwnerCreateStore, OwnerLogin, OwnerViewStore, OwnerAddComputer, OwnerEditPrice } from './StoreOwner/OwnerViews'
import CustomerGPSContext from './Customer/CustomerGPSContext'
import PrivateRoute from './PrivateRoute'

function App() {
  const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(pos => setCustomerGPS([pos.coords.longitude,pos.coords.latitude]))
  },[])

  return (
      <Router>
        <Routes>
          <Route path='/' element={<CustomerListStores />} />
          <Route path='/CustomerListStores' element={<CustomerListStores />} />
          <Route path='/CustomerSetGPS' element={<CustomerSetGPS />} />
          <Route path='/CustomerViewInventory/' element={<PrivateRoute><CustomerViewInventory /></PrivateRoute>} />
          <Route path='/CustomerViewInventory/:storeName' element={<PrivateRoute><CustomerViewInventory /></PrivateRoute>} />
          <Route path='/CustomerCompare' element={<CustomerCompare />} />

          <Route path='/SiteManagerLogin' element={<SiteManagerLogin />} />
          <Route path='/SiteManagerListStores' element={<SiteManagerListStores />} />

          <Route path='/OwnerCreateStore' element={<OwnerCreateStore />} />
          <Route path='/OwnerLogin' element={<OwnerLogin />} />
          <Route path='/OwnerViewStore/:storeName' element={<OwnerViewStore />} />
          <Route path='/OwnerAddComputer' element={<OwnerAddComputer />} />
          <Route path='/OwnerEditPrice' element={<OwnerEditPrice />} />
        </Routes>
      </Router>
  )
}

export default App