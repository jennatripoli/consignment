import { useState } from "react"
import { header, ownerCreateStore, ownerEditPrice } from "../Layout"
import { useLocation, useNavigate } from "react-router-dom"

export default function OwnerEditPrice() {
    // Route navigation.
    const navigate = useNavigate()
    // Computer being edited from parameter.
    const { computer } = useLocation().state
    // Confirmation text below button.
    const [confirmation, setConfirmation] = useState('')
    // The computer's price.
    const [price, setPrice] = useState(computer.price)

    /** Update the price of the computer. */
    async function updatePrice() {
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
        <div className='OwnerEditPrice'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={ownerEditPrice}>
                <div style={ownerEditPrice.title}>-- ADD A COMPUTER --</div>
                <div style={ownerEditPrice.computer}>
                    <label>Name:</label>&emsp;<input id='name' type='text' value={computer.name} style={ownerEditPrice.entry} readOnly disabled className='Entry-light-disabled'></input>
                    <br /><br />
                    <label>Price:</label>&emsp;<input id='price' type='text' value={price} onChange={e => setPrice(e.target.value)} style={ownerEditPrice.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Memory:</label>&emsp;<input value={computer.memory} style={ownerEditPrice.entry} readOnly disabled className='Entry-light-disabled'></input>&emsp;
                    <label>Storage:</label>&emsp;<input value={computer.storage} style={ownerEditPrice.entry} readOnly disabled className='Entry-light-disabled'></input>
                    <br /><br />
                    <label>Processor:</label>&emsp;<input value={computer.processor} style={ownerEditPrice.entry} readOnly disabled className='Entry-light-disabled'></input>&emsp;
                    <label>Generation:</label>&emsp;<input value={computer.processorgen} style={ownerEditPrice.entry} readOnly disabled className='Entry-light-disabled'></input>
                    <br /><br />
                    <label>Graphics:</label>&emsp;<input value={computer.graphics} style={ownerEditPrice.entry} readOnly disabled className='Entry-light-disabled'></input>
                </div>
                <button onClick={updatePrice} style={ownerCreateStore.button} className='Button-light'>Update</button><br />
                {confirmation.length > 0 && <label>{confirmation}</label>}
            </div>
        </div >
    )
}