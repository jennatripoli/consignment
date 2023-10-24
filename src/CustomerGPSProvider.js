import React, { useState } from 'react'
import CustomerGPSContext from './CustomerGPSContext'

const CustomerGPSProvider = ({ children }) => {
    const [customerGPS, setCustomerGPS] = useState([33.9727, -118.3507])

    return (
        <CustomerGPSContext.Provider value={{ customerGPS, setCustomerGPS }}>
            {children}
        </CustomerGPSContext.Provider>
    )
}

export default CustomerGPSProvider
