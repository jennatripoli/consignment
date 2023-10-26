import { useContext } from "react"
import CustomerGPSContext from "./Customer/CustomerGPSContext"
import { Navigate, useResolvedPath } from "react-router-dom"

export default function PrivateRoute({ children }) {
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    const pathname = useResolvedPath().pathname
    let isAuthenticated = !(customerGPS[0] === null || customerGPS[1] === null)

    return isAuthenticated ? children : <Navigate to="/CustomerSetGPS" state={{
        destination: pathname
    }} replace />
}