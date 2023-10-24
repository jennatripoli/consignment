import { useState, useEffect } from "react"
import { header, siteManagerListStores } from "./Layout"
import { useNavigate } from "react-router-dom"

export default function SiteManagerListStores() {
    const [retrieved, setRetreived] = useState(false)
    const [stores, setStores] = useState([])
    const [storesHTML, setStoresHTML] = useState([])
    const [sort, setSort] = useState('')

    const navigate = useNavigate()

    retrieve()
    function retrieve() {
        if (retrieved) return
        else setRetreived(true)

        // FOR TESTING
        setStores([{ storeName: 'Store1', inventory: 300, balance: 300 }, { storeName: 'Store2', inventory: 500, balance: 100 }, { storeName: 'Store3', inventory: 200, balance: 400 }, { storeName: 'Store4', inventory: 100, balance: 500 }])
        setSort('ascending')

        /*instance.get('/siteManagerListStores').then((response) => {
          if (response.status === 200) {
            setStores(response)
            setSort('ascending')
          }
        })*/
    }

    useEffect(() => {
        if (sort === 'ascending')
        {
            document.getElementById('ascending').checked = true
            document.getElementById('descending').checked = false
            setStores([].concat(stores).sort((a, b) => b.inventory - a.inventory))
        } else if (sort === 'descending')
        {
            document.getElementById('descending').checked = true
            document.getElementById('ascending').checked = false
            setStores([].concat(stores).sort((a, b) => a.inventory - b.inventory))
        }
    }, [sort])

    useEffect(() => {
        storesHTML.length = 0
        stores.forEach(store => {
            const entry = (
                <div key={store.storeName}>
                    <div style={siteManagerListStores.store}><span style={{ fontWeight: 'bold' }}>{store.storeName}<br />Inventory: </span>${store.inventory}<br /><span style={{ fontWeight: 'bold' }}>Balance: </span>${store.balance}</div>
                    <button key={store.storeName.concat(' Button')} onClick={() => handleButtonDelete(store.storeName)} style={siteManagerListStores.button} className='Button-white'><svg xmlns="http://www.w3.org/2000/svg" height="4em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg></button>
                </div>
            )
            storesHTML.push(entry)
        })
        setStoresHTML([].concat(storesHTML))
    }, [stores])

    function handleButtonLogout() {
        navigate('/CustomerListStores')
    }

    function handleButtonDelete(storeNameDelete) {
        // FOR TESTING
        const storesWithoutDeleted = []
        stores.forEach(store => { if (store.storeName !== storeNameDelete) storesWithoutDeleted.push(store) })
        setStores([].concat(storesWithoutDeleted))

        const msg = {}
        msg['storeName'] = storeNameDelete
        const data = { 'body': JSON.stringify(msg) }

        /*instance.post('/siteManagerDeleteStore', data).then((response) => {
          if (response.status === 200) {
            setStores(response)
          }
        })*/
    }

    function handleSort() {
        if (document.getElementById('ascending').checked) setSort('ascending')
        else if (document.getElementById('descending').checked) setSort('descending')
    }

    return (
        <div className='SiteManagerListStores'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={handleButtonLogout} style={header.buttonRight} className='Button-light'>Logout</button>
            </div>

            <div style={siteManagerListStores}>
                <div style={siteManagerListStores.title}>-- ALL STORES --</div>
                <div style={siteManagerListStores.sort}><span style={{ fontWeight: 'bold' }}>Sort Inventory:</span>&emsp;
                    <label><input type='radio' className='Radio' id='ascending' name='sort' value='ascending' onChange={handleSort}></input>Ascending</label>&emsp;
                    <label><input type='radio' className='Radio' id='descending' name='sort' value='ascending' onChange={handleSort}></input>Descending</label>
                </div>
                <div id='stores' style={siteManagerListStores.stores}>{storesHTML}</div>
            </div>
        </div>
    )
}