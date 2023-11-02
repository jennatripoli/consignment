import { useState, useMemo, useReducer, useContext, useEffect } from 'react'
import { header, customerViewInventory } from '../Layout'
import { Navigate, useNavigate, useLocation, useParams, useResolvedPath } from 'react-router-dom'
import CustomerGPSContext from './CustomerGPSContext'

export default function CustomerViewInventory() {
    // Route navigation.
    const navigate = useNavigate()

    const pathname = useResolvedPath().pathname
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)

    // if (customerGPS[0] === null || customerGPS[1] === null)
    // {
    //     return <Navigate to="/CustomerSetGPS" state={{
    //         destination: pathname
    //     }} replace />
    // }

    // List of inventory to display.
    const [inventory, setInventory] = useState([])

    const [selectedStore, setSelectedStore] = useState(null)
    // Determine if string contains a search string.
    const containsString = searchStr => str => str.includes(searchStr)
    // Determine if value is within a range.
    const inRange = (low, high) => n => n >= low && n <= high

    const { storeName } = useParams()


    function handleButtonCompare(computer) {
        if (selectedStore === null)
        {
            setSelectedStore(computer)
        }
        else if(selectedStore === computer)
        {
            setSelectedStore(null)
        }
        else
        {
            navigate('/CustomerCompare', {state: {computer1: selectedStore, computer2: computer}})
        }
    }

    async function retrieve(store) {
        if (store === undefined)
        {
            let resp = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer`, {
                method: 'GET'
            })
            let json = await resp.json()
            if (resp.status === 200)
            {
                setInventory(json)
            }
        }
        else
        {
            let resp = await fetch(`https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer?storeName=${store}`, {
                method: 'GET'
            })
            let json = await resp.json()
            if (resp.status === 200)
            {
                setInventory(json)
            }
        }
    }

    useEffect(() => { retrieve(storeName) }, [])

    // Categories of filters and the values to use for filtering.
    const filterCategories = [{
        humanReadable: 'Price',
        itemProperty: 'price',
        filters: [
            { name: '$2001 or more', validate: inRange(2001, Infinity) },
            { name: '$1501 - $2000', validate: inRange(1501, 2000) },
            { name: '$1001 - $1500', validate: inRange(1001, 1500) },
            { name: '$501 - $1000', validate: inRange(501, 1000) },
            { name: '$500 or less', validate: inRange(0, 500) }]
    }, {
        humanReadable: 'Memory',
        itemProperty: 'memory',
        filters: ['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB'],
    }, {
        humanReadable: 'Storage',
        itemProperty: 'storage',
        filters: ['4 TB', '2 TB', '1 TB', '512 GB', '256 GB', '128 GB'],
    }, {
        humanReadable: 'Processor',
        itemProperty: 'processor',
        filters: [
            { name: 'AMD', validate: containsString('AMD') },
            { name: 'Intel', validate: containsString('Intel') },
            'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7'],
    }, {
        humanReadable: 'Processor Generation',
        itemProperty: 'processorGen',
        filters: ['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series'],
    }, {
        humanReadable: 'Graphics Card',
        itemProperty: 'graphics',
        filters: [
            { name: 'NVIDIA', validate: containsString('NVIDIA') },
            { name: 'AMD', validate: containsString('AMD') },
            { name: 'Intel', validate: containsString('Intel') },
            'NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770'],
    }]

    /** Update filter actions based on filter states. */
    function updateFilterAction(state, action) {
        if (action.itemProperty === undefined || action.filter === undefined || action.checked === undefined) return { ...state }
        return state.map(fS => {
            if (fS.itemProperty === action.itemProperty)
            {
                let newActive
                if (action.checked)
                {
                    newActive = fS.active.map(_ => _)
                    newActive.push(action.filter)
                } else newActive = fS.active.filter(f =>
                    action.filter.name === undefined ? f != action.filter : f.name != action.filter.name)
                return { ...fS, active: newActive }
            } else return fS
        })
    }

    function calculateShipping(computer)
    {
        var radius = 3959 // miles
        var dLat = (computer.lat-parseFloat(customerGPS[0])) * Math.PI / 180
        var dLon = (computer.long-parseFloat(customerGPS[1])) * Math.PI / 180
        var lat1 = parseFloat(customerGPS[0]) * Math.PI / 180
        var lat2 = computer.lat * Math.PI / 180

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
        var b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        var distance = radius * b
        return (Math.round(distance * 100 * 0.03)/100).toFixed(2) //0.03 cents a mile
    }

    // Update filters based on changed filter actions.
    const [filters, updateFilters] = useReducer(updateFilterAction, filterCategories.map(v => ({
        itemProperty: v.itemProperty, active: []
    })))

    // Filter inventory based on active filters.
    const filteredInventory = useMemo(() => filters.reduce((iList, filter) =>
        filter.active.length === 0 ? iList : iList.filter(item =>
            filter.active.find(aI => (aI.validate ?? (s => s === aI))(item[filter.itemProperty])) !== undefined)
        , inventory), [inventory, filters])

        return (
        <div className='CustomerViewInventory'>
            {/* fix my styling 👉👈*/}
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
                        {storeName && <button onClick={e => navigate(`/OwnerViewStore/${storeName}`)} style={{ borderRadius: '1em', maxWidth: '7em', border: 'transparent', fontSize: '1.5em', padding: '0.2em 0.5em 0.2em 0.5em', alignSelf: 'center' }} className='Button-light'> Log In </button>}
                    <button onClick={() => navigate(-1)} style={{ marginLeft: '.5em', borderRadius: '1em', maxWidth: '7em', border: 'transparent', fontSize: '1.5em', padding: '0.2em 0.5em 0.2em 0.5em', alignSelf: 'center' }} className='Button-light'>Back</button>
                </div>
            </div>

            <div style={customerViewInventory}>
                <div style={customerViewInventory.title}>{`-- ${storeName ? storeName : 'ALL SITE'} INVENTORY --`}</div>
                <div style={customerViewInventory.filter}>
                    <span style={customerViewInventory.filterTitle}>SEARCH FILTERS</span>
                    {filterCategories.map(fS => (
                        <div key={fS.itemProperty}>
                            <br /><b>{fS.humanReadable}:</b><br />
                            {fS.filters.map(filter => (
                                <div>
                                    <label><input type='checkbox' className='Checkbox'
                                        onClick={e => { updateFilters({ itemProperty: fS.itemProperty, filter, checked: e.target.checked }) }}
                                        name={fS.itemProperty} ></input>{filter.name ?? filter}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div id='inventory' style={customerViewInventory.inventory}>
                    {filteredInventory.map(computer => (
                        <div key={computer.id}>
                            <div style={{...customerViewInventory.computer,outline:(selectedStore !== null && selectedStore.id == computer.id)?'3px solid orange':'none'}}>
                                <div style={customerViewInventory.left}><b>{computer.name}</b><br /><br />Memory: {computer.memory}<br />Storage Size: {computer.storage}<br />Processor: {computer.processor}<br />Processor Gen: {computer.processorgen}<br />Graphics: {computer.graphics}</div>
                                <div style={customerViewInventory.right}><b>Total Price: ${(parseFloat(computer.price) + parseFloat(calculateShipping(computer))).toFixed(2)}</b><br /><br />Store: {computer.store}<br />List Price: ${computer.price}<br />Shipping: ${calculateShipping(computer)}</div>
                            </div>
                            <button id={computer.id + 'Compare'} style={customerViewInventory.button} className='Button-light' onClick={() => handleButtonCompare(computer)}>Compare</button>
                            <button id={computer.id + 'Purchase'} style={customerViewInventory.button} className='Button-light' onClick={() => console.log('purchase')}>Purchase</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}