import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { header, ownerViewStore } from '../Layout'

export default function OwnerViewStore() {
    // Route navigation.
    const navigate = useNavigate()
    // Store name from parameter.
    const { storeName } = useParams()
    // List of inventory to display.
    const [inventory, setInventory] = useState([])
    // Total inventory amount for store.
    const [totalInventory, setTotalInventory] = useState(0)
    // Total balance amount for store.
    const [totalBalance, setTotalBalance] = useState(0)
    // How to sort the computers based on date added ('ascending' or 'descending').
    const [sort, setSort] = useState('ascending')

    async function retrieve(store) {
        if (store === undefined) {
            let resp = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer`, {
                method: 'GET'
            })
            if (resp.status === 200) {
                let json = await resp.json()
                setInventory(json)
                setTotalInventory(json.reduce((tot, comp) => tot + comp.price, 0))
            }
        } else {
            let resp = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer?storeName=${store}`, {
                method: 'GET'
            })
            if (resp.status === 200) {
                let json = await resp.json()
                setInventory(json)
                setTotalInventory(json.reduce((tot, comp) => tot + comp.price, 0))
            }
        }
        let json = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/store`, {
            method: 'GET'
        }).then(r => r.json())
        json = json.filter(store => store.storeName === storeName)[0]
        setTotalBalance(json.balance)
    }

    useEffect(() => { retrieve(storeName) }, [])

    /** Delete a computer from the store. */
    async function deleteComputer(computer) {
        console.log(computer)
        let resp = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer`, {
            method: 'DELETE',
            body: JSON.stringify(
                { action: 'DELETE', ...computer }
            )
        })
        if (resp.status === 200) setInventory([...inventory.filter(comp => comp.id !== computer.id)])
    }

    /** Edit the price of a computer. */
    function editComputer(computer) {
        navigate('/OwnerEditPrice', { state: { computer: computer } })
    }

    /** Sort the stores by their inventory. */
    function sortInventory() {
        if (document.getElementById('ascending').checked) setSort('ascending')
        else if (document.getElementById('descending').checked) setSort('descending')
    }

    return (
        <div className='OwnerViewStore'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={e => navigate('/OwnerAddComputer', { state: { store: storeName } })} style={header.buttonMiddle} className='Button-light'>Add Computer</button>
                <button onClick={() => navigate(-2)} style={header.buttonRight} className='Button-light'>Logout</button>
            </div>

            <div style={ownerViewStore}>
                <div style={ownerViewStore.title}>-- ALL COMPUTERS --</div>
                <div style={ownerViewStore.info}>
                    <span style={ownerViewStore.data}><b>Inventory:</b> ${totalInventory}</span>
                    <span style={ownerViewStore.sort}><span style={{ fontWeight: 'bold' }}>Sort Date:</span>&emsp;
                        <label><input type='radio' className='Radio' id='ascending' name='sort' value='ascending' onChange={sortInventory}></input>Ascending</label>&emsp;
                        <label><input type='radio' className='Radio' id='descending' name='sort' value='ascending' onChange={sortInventory}></input>Descending</label>
                    </span>
                    <span style={ownerViewStore.data}><b>Balance:</b> ${totalBalance}</span>
                </div>
                <div id='inventory' style={ownerViewStore.inventory}>{inventory.map(computer =>
                    <div key={computer.id} style={ownerViewStore.computer}>
                        <div style={ownerViewStore.text}><b>{computer.name}<br />List Price: ${computer.price}</b><br /><br />Memory: {computer.memory}<br />Storage Size: {computer.storage}<br />Processor: {computer.processor}<br />Processor Gen: {computer.processorgen}<br />Graphics: {computer.graphics}<br />Date Added: {'MM-DD-YYYY'}</div>
                        <div style={ownerViewStore.button}>
                            <button key={computer.id.concat(' Edit')} onClick={() => editComputer(computer)} className='Button-white'><svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg></button><br />
                            <button key={computer.id.concat(' Delete')} onClick={() => deleteComputer(computer)} className='Button-white'><svg xmlns='http://www.w3.org/2000/svg' height='4em' viewBox='0 0 576 512'><path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z' /></svg></button>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}