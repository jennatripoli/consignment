import { useState } from 'react'
import CustomerGPSContext from './CustomerGPSContext'

const CustomerGPSProvider = ({ children }) => {
    const [customerGPS, setCustomerGPS] = useState([undefined, undefined])

    return (
        <CustomerGPSContext.Provider value={{ customerGPS, setCustomerGPS }}>
            {children}
        </CustomerGPSContext.Provider>
    )
}

export default CustomerGPSProvider