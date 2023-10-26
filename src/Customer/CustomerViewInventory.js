import { useState, useMemo, useReducer, useContext, useEffect } from 'react'
import { header, customerViewInventory } from '../Layout'
import { useNavigate, useLocation } from 'react-router-dom'
import CustomerGPSContext from './CustomerGPSContext'

function retrieve(store) {
    // FOR TESTING
    if (store === '')
    {
        return [{ storeName: 'Store1', longitude: 100, latitude: 100, id: 1, name: 'Computer1', price: 100, memory: '1 GB', storage: '128 GB', processor: 'Intel Xeon', processorGen: '11th Gen Intel', graphics: 'Intel Integrated Graphics' },
        { storeName: 'Store1', longitude: 400, latitude: 200, id: 2, name: 'Computer2', price: 1600, memory: '8 GB', storage: '512 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'NVIDIA GeForce RTX 4090' },
        { storeName: 'Store1', longitude: 700, latitude: 600, id: 3, name: 'Computer3', price: 600, memory: '32 GB', storage: '2 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'NVIDIA GeForce RTX 4080' },
        { storeName: 'Store2', longitude: 1000, latitude: 1000, id: 4, name: 'Computer4', price: 200, memory: '4 GB', storage: '256 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'Intel UHD Graphics 730' },
        { storeName: 'Store3', longitude: 500, latitude: 800, id: 5, name: 'Computer5', price: 400, memory: '12 GB', storage: '512 GB', processor: 'AMD Ryzen 7', processorGen: 'AMD Ryzen 6000 Series', graphics: 'AMD Radeon Pro W6400' },
        { storeName: 'Store4', longitude: 1000, latitude: 900, id: 6, name: 'Computer6', price: 1050, memory: '16 GB', storage: '1 TB', processor: 'AMD Ryzen 9', processorGen: 'AMD Ryzen 7000 Series', graphics: 'AMD Radeon Pro W6300' },
        { storeName: 'Store4', longitude: 300, latitude: 100, id: 7, name: 'Computer7', price: 2050, memory: '32 GB', storage: '1 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'Intel UHD Graphics 770' }]
    } else
    {
        return [{ storeName: 'Store1', longitude: 100, latitude: 100, id: 1, name: 'Computer1', price: 100, memory: '1 GB', storage: '128 GB', processor: 'Intel Xeon', processorGen: '11th Gen Intel', graphics: 'Intel Integrated Graphics' },
        { storeName: 'Store1', longitude: 400, latitude: 200, id: 2, name: 'Computer2', price: 1600, memory: '8 GB', storage: '512 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'NVIDIA GeForce RTX 4090' },
        { storeName: 'Store1', longitude: 700, latitude: 600, id: 3, name: 'Computer3', price: 600, memory: '32 GB', storage: '2 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'NVIDIA GeForce RTX 4080' }]
    }
}

export default function CustomerViewInventory() {
    // Route navigation.
    const navigate = useNavigate()
    // Parameters sent with navigation.
    const params = useLocation().state
    // Value saved as the customer's GPS location.
    const { customerGPS, setCustomerGPS } = useContext(CustomerGPSContext)
    // List of inventory to display.
    const [inventory, setInventory] = useState(retrieve(params.store))
    // Determine if string contains a search string.
    const containsString = searchStr => str => str.includes(searchStr)
    // Determine if value is within a range.
    const inRange = (low, high) => n => n >= low && n <= high

    // Go to CustomerSetGPS if no GPS value is saved.
    useEffect(() => {
        if (customerGPS[0].length === 0 || customerGPS[1].length === 0)
            navigate('/CustomerSetGPS', { state: { destination: '/CustomerViewInventory', store: params.store }, replace: true })
    }, [customerGPS])

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
        filters: ['2 TB', '1 TB', '512 GB', '256 GB', '128 GB'],
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
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={customerViewInventory}>
                <div style={customerViewInventory.title}>{'-- ALL SITE INVENTORY --'}</div>
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
                            <div style={customerViewInventory.computer}>
                                <div style={customerViewInventory.left}><b>{computer.name}</b><br /><br />Memory: {computer.memory}<br />Storage Size: {computer.storage}<br />Processor: {computer.processor}<br />Processor Gen: {computer.processorGen}<br />Graphics: {computer.graphics}</div>
                                <div style={customerViewInventory.right}><b>Total Price: ${computer.price + 1000.23}</b><br /><br />Store: {computer.storeName}<br />List Price: ${computer.price}<br />Shipping: ${1000.23}</div>
                            </div>
                            <button key={toString(computer.id).concat(' Compare')} style={customerViewInventory.button} className='Button-light'>Compare</button>
                            <button key={toString(computer.id).concat(' Purchase')} style={customerViewInventory.button} className='Button-light'>Purchase</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}