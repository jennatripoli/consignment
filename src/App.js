import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CustomerListStores, CustomerSetGPS, CustomerViewInventory, CustomerCompare } from './CustomerViews'
import { SiteManagerLogin, SiteManagerListStores } from './SiteManagerViews'
import { OwnerCreateStore, OwnerLogin, OwnerViewStore, OwnerAddComputer, OwnerEditPrice } from './OwnerViews'
import CustomerGPSProvider from './CustomerGPSProvider'

// const instance = axios.create({ baseURL: 'URL' })

function App() {
  return (
    <CustomerGPSProvider>
      <Router>
        <Routes>
          <Route path='/' element={<CustomerListStores />} />
          <Route path='/CustomerListStores' element={<CustomerListStores />} />
          <Route path='/CustomerSetGPS' element={<CustomerSetGPS />} />
          <Route path='/CustomerViewInventory' element={<CustomerViewInventory />} />
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
