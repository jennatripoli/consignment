import { useState } from "react"
import { header, ownerCreateStore } from "../Layout"
import { useLocation, useNavigate } from "react-router-dom"
import './OwnerAddComputer.css'

export default function OwnerEditPrice() {
    const { computer } = useLocation().state

    const navigate = useNavigate()

    const [confirmation, setConfirmation] = useState('')

    const [price, setPrice] = useState(computer.price)

    async function handleButtonUpdate() {
        setConfirmation('Updating price, please wait.')
        try {
            let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer', {
                method: 'POST',
                body: JSON.stringify({
                    request: 'update',
                    id: computer.id,
                    price: price,
                    store: computer.store,
                })
            })
            if (resp.status === 200) navigate(-1)
            else setConfirmation('Failed to update price, please fill in all fields.')
        } catch (e) {
            console.log(e)
            setConfirmation('Failed to update price.')
        }
    }

    return (
        <div className='OwnerCreateStore'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={ownerCreateStore}>
                <div style={ownerCreateStore.title}>-- ADD A COMPUTER --</div>
                <div style={ownerCreateStore.store} className='ownerCreateStoreInput'>
                    <div>
                        <label>Name:</label>
                        <input id='name' type='text' value={computer.name} readOnly disabled className='disabled-input'></input>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input id='price' type='text' value={price} onChange={e => setPrice(e.target.value)} className='Entry-light'></input>
                    </div>
                    <div>
                        <label>Memory:</label>
                        <input value={computer.memory} disabled className="disabled-input"></input>
                    </div>
                    <div>
                        <label>Storage:</label>
                        <input value={computer.storage} disabled className="disabled-input"></input>
                    </div>
                    <div>
                        <label>Processor:</label>
                        <input value={computer.processor} disabled className="disabled-input"></input>
                    </div>
                    <div>
                        <label>Generation:</label>
                        <input value={computer.processorgen} disabled className="disabled-input"></input>
                    </div>
                    <div>
                        <label>Graphics:</label>
                        <input value={computer.graphics} disabled className="disabled-input"></input>
                    </div>
                </div>
                <button onClick={handleButtonUpdate} style={ownerCreateStore.button} className='Button-light'>Update</button><br />
                {confirmation.length > 0 && <label>{confirmation}</label>}
            </div>
        </div >
    )
}