import CustomerGPSContext from './CustomerGPSContext'
import { customerSetGPS, header } from '../Layout'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'

export default function CustomerSetGPS() {
    // Route navigation.
    const navigate = useNavigate()
    // Parameters sent with navigation.
    const params = useLocation().state
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    // The input for the longitude coordinate.
    const [longitude, setLongitude] = useState(customerGPS[0])
    // The input for the latitude coordinate.
    const [latitude, setLatitude] = useState(customerGPS[1])
    // The confirmation text that will indicate failure to save.
    const [confirmation, setConfirmation] = useState(undefined)

    /** Save the GPS data. */
    function saveGPS() {
        if (longitude && latitude) {
            if (longitude >= -180 && longitude <= 180 && latitude >= -90 && longitude <= 90) {
                setCustomerGPS([longitude, latitude])
                setConfirmation('Save successful!')
                if (params !== null) navigate(params.destination, { replace: true })
            } else setConfirmation('Failed to save GPS, values must be in range.')
        } else setConfirmation('Failed to save GPS, please fill in all fields.')
    }

    return (
        <div className='CustomerSetGPS'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={customerSetGPS}>
                <div style={customerSetGPS.title}>-- SET GPS LOCATION --</div>
                <div style={customerSetGPS.gps}>
                    <label>Longitude:&emsp;</label>
                    <input id='longitude' type='number' value={longitude} style={customerSetGPS.entry} onChange={(e) => setLongitude(e.target.value)} className='Entry-light'></input>
                    <br /><br />
                    <label>Latitude:&emsp;&nbsp;&nbsp;&nbsp;</label>
                    <input id='latitude' type='number' value={latitude} style={customerSetGPS.entry} onChange={(e) => setLatitude(e.target.value)} className='Entry-light'></input>
                </div>
                <button onClick={saveGPS} style={customerSetGPS.button} className='Button-light'>Save</button><br />
                <label>{confirmation}</label>
            </div>
        </div>
    )
}