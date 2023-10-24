import { useEffect, useState } from "react"
import { header, customerViewAll } from "./Layout"
import { useNavigate } from "react-router-dom"

export default function CustomerViewAll() {
    const navigate = useNavigate()
    // Boolean to indicate if data is retrieved.
    const [retrieved, setRetreived] = useState(false)
    // List of all inventory in the site.
    const [allInventory, setAllInventory] = useState([])
    // List of inventory to display, based on active filters.
    const [inventory, setInventory] = useState([])
    // HTML to display the list of inventory.
    const [inventoryHTML, setInventoryHTML] = useState([])
    // List of active price filters.
    const [price, setPrice] = useState([[2001, NaN], [1501, 2000], [1001, 1500], [501, 1000], [0, 500]])
    // List of active memory filters.
    const [memory, setMemory] = useState(['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB'])
    // List of active storage filters.
    const [storage, setStorage] = useState(['2 TB', '1 TB', '512 GB', '256 GB', '128 GB'])
    // List of active processor filters.
    const [processor, setProcessor] = useState(['Intel', 'AMD', 'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7'])
    // List of active processor generation filters.
    const [processorGen, setProcessorGen] = useState(['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series'])
    // List of active graphics filters.
    const [graphics, setGraphics] = useState(['NVIDIA', 'AMD', 'Intel', 'NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770'])

    retrieve()
    function retrieve() {
        if (retrieved) return
        else setRetreived(true)

        // FOR TESTING
        setAllInventory([
            { storeName: 'Store1', longitude: 100, latitude: 100, id: 1, name: 'Computer1', price: 100, memory: '1 GB', storage: '128 GB', processor: 'Intel Xeon', processorGen: '11th Gen Intel', graphics: 'Intel Integrated Graphics' },
            { storeName: 'Store1', longitude: 400, latitude: 200, id: 2, name: 'Computer2', price: 1600, memory: '8 GB', storage: '512 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'NVIDIA GeForce RTX 4090' },
            { storeName: 'Store1', longitude: 700, latitude: 600, id: 3, name: 'Computer3', price: 600, memory: '32 GB', storage: '2 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'NVIDIA GeForce RTX 4080' },
            { storeName: 'Store2', longitude: 1000, latitude: 1000, id: 4, name: 'Computer4', price: 200, memory: '4 GB', storage: '256 GB', processor: 'Intel i7', processorGen: '12th Gen Intel', graphics: 'Intel UHD Graphics 730' },
            { storeName: 'Store3', longitude: 500, latitude: 800, id: 5, name: 'Computer5', price: 400, memory: '12 GB', storage: '512 GB', processor: 'AMD Ryzen 7', processorGen: 'AMD Ryzen 6000 Series', graphics: 'AMD Radeon Pro W6400' },
            { storeName: 'Store4', longitude: 1000, latitude: 900, id: 6, name: 'Computer6', price: 1050, memory: '16 GB', storage: '1 TB', processor: 'AMD Ryzen 9', processorGen: 'AMD Ryzen 7000 Series', graphics: 'AMD Radeon Pro W6300' },
            { storeName: 'Store4', longitude: 300, latitude: 100, id: 7, name: 'Computer7', price: 2050, memory: '32 GB', storage: '1 TB', processor: 'Intel i9', processorGen: '13th Gen Intel', graphics: 'Intel UHD Graphics 770' }])
    }

    // Update inventory when any active filters change.
    useEffect(() => {
        const computersToRemove = []
        allInventory.forEach(computer => {
            let flag = false
            price.forEach(filter => {
                if (computer.price >= filter[0]) {
                    if (!isNaN(filter[1]) && computer.price <= filter[1]) flag = true
                    else if (isNaN(filter[1])) flag = true
                }
            })
            if (!flag) computersToRemove.push(computer.id)

            flag = false
            memory.forEach(filter => { if (computer.memory.includes(filter)) flag = true })
            if (!flag) computersToRemove.push(computer.id)

            flag = false
            storage.forEach(filter => { if (computer.storage.includes(filter)) flag = true })
            if (!flag) computersToRemove.push(computer.id)

            flag = false
            processor.forEach(filter => { if (computer.processor.includes(filter)) flag = true })
            if (!flag) computersToRemove.push(computer.id)

            flag = false
            processorGen.forEach(filter => { if (computer.processorGen.includes(filter)) flag = true })
            if (!flag) computersToRemove.push(computer.id)

            flag = false
            graphics.forEach(filter => { if (computer.graphics.includes(filter)) flag = true })
            if (!flag) computersToRemove.push(computer.id)
        })
        removeComputers(computersToRemove)
    }, [price, memory, storage, processor, processorGen, graphics])

    // Update inventoryHTML when inventory changes.
    useEffect(() => {
        inventoryHTML.length = 0
        inventory.forEach(computer => {
            // TODO ADD SHIPPING CALCULATION
            const shipping = 1000.23

            const entry = (
                <div key={computer.id}>
                    <div style={customerViewAll.computer}>
                        <div style={customerViewAll.left}><span style={{ fontWeight: 'bold' }}>{computer.name}</span><br /><br />Memory: {computer.memory}<br />Storage Size: {computer.storage}<br />Processor: {computer.processor}<br />Processor Gen: {computer.processorGen}<br />Graphics: {computer.graphics}</div>
                        <div style={customerViewAll.right}><span style={{ fontWeight: 'bold' }}>Total Price: ${computer.price + shipping}</span><br /><br />Store: {computer.storeName}<br />List Price: ${computer.price}<br />Shipping: ${shipping}</div>
                    </div>
                    <button key={toString(computer.id).concat(' Compare')} style={customerViewAll.button} className='Button-light'>Compare</button>
                    <button key={toString(computer.id).concat(' Purchase')} style={customerViewAll.button} className='Button-light'>Purchase</button>
                </div>
            )
            inventoryHTML.push(entry)
        })
        setInventoryHTML([].concat(inventoryHTML))
    }, [inventory])

    /** Set inventory to not include computers that are removed through filters. 
     * @param ids An array of the id of each computer to be removed.
     */
    function removeComputers(ids) {
        const inventoryWithoutDeleted = []
        allInventory.forEach(computer => { if (!ids.includes(computer.id)) inventoryWithoutDeleted.push(computer) })
        setInventory([].concat(inventoryWithoutDeleted))
    }

    /** Update all active filters based on user selection. If no filters are selected for a specific criteria, the inventory will not be filtered on that criteria. */
    function handleFilter() {
        let priceFilter = [], memoryFilter = [], storageFilter = [], processorFilter = [], processorGenFilter = [], graphicsFilter = []

        document.getElementsByName('price').forEach(checkbox => { if (checkbox.checked) priceFilter.push([parseInt(checkbox.value.split(',')[0]), parseInt(checkbox.value.split(',')[1])]) })
        document.getElementsByName('memory').forEach(checkbox => { if (checkbox.checked) memoryFilter = memoryFilter.concat(checkbox.value.split(',')) })
        document.getElementsByName('storage').forEach(checkbox => { if (checkbox.checked) storageFilter = storageFilter.concat(checkbox.value.split(',')) })
        document.getElementsByName('processor').forEach(checkbox => { if (checkbox.checked) processorFilter.push(checkbox.value) })
        document.getElementsByName('processorGen').forEach(checkbox => { if (checkbox.checked) processorGenFilter.push(checkbox.value) })
        document.getElementsByName('graphics').forEach(checkbox => { if (checkbox.checked) graphicsFilter.push(checkbox.value) })

        if (priceFilter.length === 0) priceFilter = [[2001, NaN], [1501, 2000], [1001, 1500], [501, 1000], [0, 500]]
        if (memoryFilter.length === 0) memoryFilter = ['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB']
        if (storageFilter.length === 0) storageFilter = ['2 TB', '1 TB', '512 GB', '256 GB', '128 GB']
        if (processorFilter.length === 0) processorFilter = ['Intel', 'AMD', 'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7']
        if (processorGenFilter.length === 0) processorGenFilter = ['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series']
        if (graphicsFilter.length === 0) graphicsFilter = ['NVIDIA', 'AMD', 'Intel', 'NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770']

        setPrice(priceFilter)
        setMemory(memoryFilter)
        setStorage(storageFilter)
        setProcessor(processorFilter)
        setProcessorGen(processorGenFilter)
        setGraphics(graphicsFilter)
    }

    return (
        <div className='CustomerViewAll'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={customerViewAll}>
                <div style={customerViewAll.title}>-- ALL SITE INVENTORY --</div>
                <div style={customerViewAll.filter}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center', display: 'block' }}>SEARCH FILTERS</span>
                    <span style={{ fontWeight: 'bold' }}>List Price:</span><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='2001'></input> $2,001 or more</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='1501,2000'></input> $1,501 - $2,000</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='1001,1500'></input> $1,001 - $1,500</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='501,1000'></input> $501 - $1000</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='price' value='0,500'></input> $500 or less</label><br />
                    <br /><span style={{ fontWeight: 'bold' }}>Memory:</span><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='32 GB'></input> 32 GB or more</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='16 GB'></input> 16 GB</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='8 GB'></input> 8 GB</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='memory' value='4 GB,1 GB'></input> 4 GB or less</label><br />
                    <br /><span style={{ fontWeight: 'bold' }}>Storage Size:</span><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='2 TB'></input> 2 TB or more</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='1 TB'></input> 1 TB</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='512 GB'></input> 512 GB</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='storage' value='256 GB,128 GB'></input> 256 GB or less</label><br />
                    <br /><span style={{ fontWeight: 'bold' }}>Processor:</span><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel'></input> All Intel Processors</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='AMD'></input> All AMD Processors</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel Xeon'></input> Intel Xeon</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel i9'></input> Intel i9</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='Intel i7'></input> Intel i7</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='AMD Ryzen 9'></input> AMD Ryzen 9</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processor' value='AMD Ryzen 7'></input> AMD Ryzen 7</label><br />
                    <br /><span style={{ fontWeight: 'bold' }}>Processor Gen:</span><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='13th Gen Intel'></input> 13th Gen Intel</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='12th Gen Intel'></input> 12th Gen Intel</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='11th Gen Intel'></input> 11th Gen Intel</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='AMD Ryzen 7000 Series'></input> AMD Ryzen 7000 Series</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='processorGen' value='AMD Ryzen 6000 Series'></input> AMD Ryzen 6000 Series</label><br />
                    <br /><span style={{ fontWeight: 'bold' }}>Graphics:</span><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='NVIDIA'></input> All NVIDIA Graphics</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='AMD'></input> All AMD Graphics</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel'></input> All Intel Graphics</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='NVIDIA GeForce RTX 4090'></input> NVIDIA GeForce RTX 4090</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='NVIDIA GeForce RTX 4080'></input> NVIDIA GeForce RTX 4080</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='AMD Radeon Pro W6300'></input> AMD Radeon Pro W6300</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='AMD Radeon Pro W6400'></input> AMD Radeon Pro W6400</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel Integrated Graphics'></input> Intel Integrated Graphics</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel UHD Graphics 730'></input> Intel UHD Graphics 730</label><br />
                    <label><input type='checkbox' className='Checkbox' onClick={handleFilter} name='graphics' value='Intel UHD Graphics 770'></input> Intel UHD Graphics 770</label>
                </div>
                <div id='inventory' style={customerViewAll.inventory}>{inventoryHTML}</div>
            </div>
        </div>
    )
}