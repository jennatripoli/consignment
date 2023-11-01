import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { header, siteManagerListStores } from '../Layout'

export default function SiteManagerListStores() {
    // Route navigation.
    const navigate = useNavigate()
    // List of all stores on the site.
    const [stores, setStores] = useState([])
    // How to sort the stores based on inventory ('ascending' or 'descending').
    const [sort, setSort] = useState('ascending')

    /** Retrieve data. */
    async function retrieve() {
        let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/store', {
            method: 'GET'
        })
        let json = await resp.json()
        setStores(json.sort((a, b) => b.inventory - a.inventory))
    }

    // Update stores when sort changes.
    useEffect(() => {
        if (sort === 'ascending') {
            document.getElementById('ascending').checked = true
            document.getElementById('descending').checked = false
            setStores([...stores.sort((a, b) => b.inventory - a.inventory)])
        } else if (sort === 'descending') {
            document.getElementById('descending').checked = true
            document.getElementById('ascending').checked = false
            setStores([...stores.sort((a, b) => a.inventory - b.inventory)])
        }
    }, [sort])

    useEffect(() => { retrieve() }, [])

    /** Delete a store from the site. */
    async function handleButtonDelete(store) {
        let resp = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/store`, {
            method: 'DELETE',
            body: JSON.stringify(
                store
            )
        })
        if (resp.status === 200) setStores([...stores.filter(s => s.storeName !== store.storeName)])
    }

    /** Sort the stores by their inventory. */
    function handleSort() {
        if (document.getElementById('ascending').checked) setSort('ascending')
        else if (document.getElementById('descending').checked) setSort('descending')
    }

    return (
        <div className='SiteManagerListStores'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <Link to='/CustomerListStores'><button style={header.buttonRight} className='Button-light'>Logout</button></Link>
            </div>

            <div style={siteManagerListStores}>
                <div style={siteManagerListStores.title}>-- ALL STORES --</div>
                <div style={siteManagerListStores.sort}><span style={{ fontWeight: 'bold' }}>Sort Inventory:</span>&emsp;
                    <label><input type='radio' className='Radio' id='ascending' name='sort' value='ascending' onChange={handleSort}></input>Ascending</label>&emsp;
                    <label><input type='radio' className='Radio' id='descending' name='sort' value='ascending' onChange={handleSort}></input>Descending</label>
                </div>
                <div id='stores' style={siteManagerListStores.stores}>{stores.map(store => <div key={store.storeName}>
                    <div onClick={() => navigate(`/CustomerViewInventory/${store.storeName}`)} style={siteManagerListStores.store}><span style={{ fontWeight: 'bold' }}>{store.storeName}<br />Inventory: </span>${store.inventory}<br /><span style={{ fontWeight: 'bold' }}>Balance: </span>${store.balance}</div>
                    <button key={store.storeName.concat(' Button')} onClick={() => handleButtonDelete(store)} style={siteManagerListStores.button} className='Button-white'><svg xmlns='http://www.w3.org/2000/svg' height='4em' viewBox='0 0 448 512'><path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z' /></svg></button>
                </div>)}</div>
            </div>
        </div>
    )
}