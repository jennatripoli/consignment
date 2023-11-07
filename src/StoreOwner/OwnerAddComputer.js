import { useState } from "react"
import { header, ownerAddComputer } from "../Layout"
import { useLocation, useNavigate } from "react-router-dom"

export default function OwnerAddComputer() {
    // Route navigation.
    const navigate = useNavigate()
    // Parameters sent through state variable.
    let location = useLocation()
    // Determine if string contains a search string.
    const containsString = searchStr => str => str.includes(searchStr)
    // Options for each of the different fields.
    let memoryChoices = ['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB']
    let storageChoices = ['4 TB', '2 TB', '1 TB', '512 GB', '256 GB', '128 GB']
    let processorChoices = ['Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7']
    let processorGenChoices = ['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series']
    const [activeProcessorGenChoices, setActiveProcessorGenChoices] = useState(processorGenChoices.filter(containsString(processorChoices[0].split(' ')[0])))
    let graphicsChoices = ['NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770']

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [memory, setMemory] = useState(memoryChoices[0])
    const [storage, setStorage] = useState(storageChoices[0])
    const [processor, setProcessor] = useState(processorChoices[0])
    const [processorGen, setProcessorGen] = useState(processorGenChoices[0])
    const [graphics, setGraphics] = useState(graphicsChoices[0])
    const [confirmation, setConfirmation] = useState('')

    async function handleButtonCreate() {
        setConfirmation('Creating Store, please wait.')
        try {
            let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer', {
                method: 'POST',
                body: JSON.stringify({
                    request: 'insert',
                    name: name,
                    price: price,
                    memory: memory,
                    storage: storage,
                    processor: processor,
                    processorGen: processorGen,
                    graphics: graphics,
                    store: location.state['store'],
                    createTime: new Date().toISOString()
                })
            })
            if (resp.status === 200) navigate(-1)
            else setConfirmation('Failed to add computer, please fill in all fields.')
        } catch (e) {
            console.log(e)
            setConfirmation('Failed to add computer.')
        }
    }

    return (
        <div className='OwnerAddComputer'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={() => navigate(-1)} style={header.buttonRight} className='Button-light'>Back</button>
            </div>
            <div style={ownerAddComputer}>
                <div style={ownerAddComputer.title}>-- ADD A COMPUTER --</div>
                <div style={ownerAddComputer.computer}>
                    <label>Name:</label>&emsp;<input id='name' type='text' value={name} onChange={e => setName(e.target.value)} style={ownerAddComputer.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Price:</label>&emsp;<input id='price' type='text' value={price} onChange={e => setPrice(e.target.value)} style={ownerAddComputer.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Memory:</label>&emsp;<select onChange={e => setMemory(e.target.value)} style={ownerAddComputer.entry} className='Entry-light'>{memoryChoices.map(choice => <option value={choice}>{choice}</option>)}</select>&emsp;
                    <label>Storage:</label>&emsp;<select onChange={e => setStorage(e.target.value)} style={ownerAddComputer.entry} className='Entry-light'>{storageChoices.map(choice => <option value={choice}>{choice}</option>)}</select>
                    <br /><br />
                    <label>Processor:</label>&emsp;<select onChange={e => { setProcessor(e.target.value); setActiveProcessorGenChoices(processorGenChoices.filter(containsString(e.target.value.split(' ')[0]))) }} style={ownerAddComputer.entry} className='Entry-light'>{processorChoices.map(choice => <option value={choice}>{choice}</option>)}</select>&emsp;
                    <label>Generation:</label>&emsp;<select onChange={e => setProcessorGen(e.target.value)} style={ownerAddComputer.entry} className='Entry-light'>{activeProcessorGenChoices.map(choice => <option value={choice}>{choice}</option>)}</select>
                    <br /><br />
                    <label>Graphics:</label>&emsp;<select onChange={e => setGraphics(e.target.value)} style={ownerAddComputer.entry} className='Entry-light'>{graphicsChoices.map(choice => <option value={choice}>{choice}</option>)}</select>
                </div>
                <button onClick={handleButtonCreate} style={ownerAddComputer.button} className='Button-light'>Add to Store</button><br />
                {confirmation.length > 0 && <label>{confirmation}</label>}
            </div>
        </div >
    )
}