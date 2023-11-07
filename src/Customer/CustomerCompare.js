import { useContext } from 'react'
import { header, customerCompare } from '../Layout'
import { useNavigate, useLocation } from 'react-router-dom'
import CustomerGPSContext from './CustomerGPSContext'

export default function CustomerCompare() {
    // Route navigation.
    const navigate = useNavigate()
    // Value saved as the customer's GPS location.
    const { customerGPS } = useContext(CustomerGPSContext)
    // Computers selected for comparison.
    const { computer1, computer2 } = useLocation().state

    /** Calculate the shipping cost for a computer ($0.03 per mile). */
    function calculateShipping(computer) {
        var radius = 3959
        var dLat = (computer.lat - parseFloat(customerGPS[0])) * Math.PI / 180
        var dLon = (computer.long - parseFloat(customerGPS[1])) * Math.PI / 180
        var lat1 = parseFloat(customerGPS[0]) * Math.PI / 180
        var lat2 = computer.lat * Math.PI / 180

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
        var b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        var distance = radius * b
        return (Math.round(distance * 100 * 0.03) / 100).toFixed(2)
    }

    return (
        <div className='CustomerCompare'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>
            <div style={customerCompare}>
                <div style={customerCompare.title}>{`-- COMPARE COMPUTERS --`}</div>
                <div id='inventory' style={customerCompare.inventory}>
                    <div key={computer1.id} style={customerCompare.computer}>
                        <b>{computer1.name}<br />Total Price: ${(parseFloat(computer1.price) + parseFloat(calculateShipping(computer1))).toFixed(2)}</b><br /><br />List Price: ${computer1.price}<br />Shipping Cost: ${calculateShipping(computer1)}<br /><br />Memory: {computer1.memory}<br />Storage Size: {computer1.storage}<br />Processor: {computer1.processor}<br />Processor Gen: {computer1.processorgen}<br />Graphics: {computer1.graphics}<br />Store: {computer1.store}
                    </div>
                    <div key={computer2.id} style={customerCompare.computer}>
                        <b>{computer2.name}<br />Total Price: ${(parseFloat(computer2.price) + parseFloat(calculateShipping(computer2))).toFixed(2)}</b><br /><br />List Price: ${computer2.price}<br />Shipping Cost: ${calculateShipping(computer2)}<br /><br />Memory: {computer2.memory}<br />Storage Size: {computer2.storage}<br />Processor: {computer2.processor}<br />Processor Gen: {computer2.processorgen}<br />Graphics: {computer2.graphics}<br />Store: {computer2.store}
                    </div>
                </div>
            </div>
        </div>
    )
}