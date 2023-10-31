import { useState, useMemo, useReducer, useContext, useEffect } from 'react'
import { header, customerCompare } from '../Layout'
import { Navigate, useNavigate, useLocation, useParams, useResolvedPath } from 'react-router-dom'
import CustomerGPSContext from './CustomerGPSContext'

export default function CustomerViewInventory() {
    // Route navigation.
    const navigate = useNavigate()

    const pathname = useResolvedPath().pathname
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)

    const { computer1, computer2 } = useLocation().state

    console.log(computer1)

    return (
        <div className='CustomerCompare'>
            <div style={{
                position: 'relative',
                display: 'flex',
                width: '98%',
                margin: '1%',
                textAlign: 'left'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={header.title}>Used Computers</div>
                    <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                </div>
                <div style={{ flex: '1', display: 'flex', justifyContent: 'end' }}>
                        <button onClick={() => navigate(-1)} style={{ marginLeft: '.5em', borderRadius: '1em', maxWidth: '7em', border: 'transparent', fontSize: '1.5em', padding: '0.2em 0.5em 0.2em 0.5em', alignSelf: 'center' }} className='Button-light'>Back</button>
                </div>
            </div>
            <div style={customerCompare}>
                <div style={customerCompare.title}>{`-- COMPARE COMPUTERS --`}</div>
            </div>
            <div style={customerCompare} className='customerCompare'>
                <div id='inventory' style={customerCompare.inventory}>
                    <div key={computer1.id}>
                        <div style={customerCompare.computer}>
                            <div style={customerCompare.center}><b>{computer1.id}</b><br /><br /><b>Total Price: ${computer1.price + 1000.23}</b><br /><br />List Price: ${computer1.price}<br />Shopping Cost: ${1000.23}<br />Memory: {computer1.memory}<br />Storage Size: {computer1.storage}<br />Processor: {computer1.processor}<br />Processor Gen: {computer1.processorgen}<br />Graphics: {computer1.graphics}<br />Store: {computer1.store}<br />Shipping: ${1000.23}</div>
                        </div>
                    </div>
                    <div key={computer2.id}>
                        <div style={customerCompare.computer}>
                            <div style={customerCompare.center}><b>{computer2.id}</b><br /><br /><b>Total Price: ${computer2.price + 1000.23}</b><br /><br />List Price: ${computer2.price}<br />Shopping Cost: ${1000.23}<br />Memory: {computer2.memory}<br />Storage Size: {computer2.storage}<br />Processor: {computer2.processor}<br />Processor Gen: {computer2.processorgen}<br />Graphics: {computer2.graphics}<br />Store: {computer2.store}<br />Shipping: ${1000.23}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}