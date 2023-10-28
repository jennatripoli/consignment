import { memo, useState } from "react"
import { header, ownerCreateStore } from "../Layout"
import { useLocation, useNavigate } from "react-router-dom"
import './OwnerAddComputer.css'

export default function OwnerAddComputer() {

    let location = useLocation()

    const navigate = useNavigate()

    const [price, setPrice] = useState(0)
    const [memory, setMemory] = useState('1 GB')
    const [storage, setStorage] = useState('1 TB')
    const [processor, setProcessor] = useState('AMD')
    const [processorGen, setProcessorGen] = useState('AMD Ryzen 7000 Series')
    const [graphics, setGraphics] = useState('NVIDIA GeForce RTX 4090')
    const [confirmation, setConfirmation] = useState('')

    // Determine if string contains a search string.
    const containsString = searchStr => str => str.includes(searchStr)

    let memoryChoices = ['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB']
    let storageChoices = ['2 TB', '1 TB', '512 GB', '256 GB', '128 GB']
    let processorChoices = ['AMD', 'Intel', 'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7']
    let processorGenChoices = ['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series']
    const [activeProcessorGenChoices, setActiveProcessorGenChoices] = useState(processorGenChoices.filter(containsString(processorChoices[0].split(' ')[0])))
    let graphicsChoices = ['NVIDIA', 'AMD', 'Intel', 'NVIDIA GeForce RTX 4090', 'NVIDIA GeForce RTX 4080', 'AMD Radeon Pro W6300', 'AMD Radeon Pro W6400', 'Intel Integrated Graphics', 'Intel UHD Graphics 730', 'Intel UHD Graphics 770']


    async function handleButtonCreate() {
        setConfirmation('Creating Store, Please Wait')
        try
        {
            let resp = await fetch('https://rd2h68s92m.execute-api.us-east-1.amazonaws.com/prod/computer',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        price: price,
                        memory: memory,
                        storage: storage,
                        processor: processor,
                        processorGen: processorGen,
                        graphics: graphics,
                        store: location.state['store']
                    })
                })
            if (resp.status == 200)
            {
                navigate(-1)
            } else setConfirmation('Failed to create computer, please fill in all fields.')

        } catch (e)
        {
            console.log(e);
            setConfirmation('Failed to create computer')
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
                        <label>Price:</label>
                        <input id='price' type='text' value={price} onChange={e => setPrice(e.target.value)} className='Entry-light'></input>
                    </div>
                    <div>
                        <label>Memory:</label>
                        <select onChange={e => setMemory(e.target.value)}>
                            {memoryChoices.map(choice => <option value={choice}>{choice}</option>)}
                        </select>
                        <label>Storage:</label>
                        <select onChange={e => setStorage(e.target.value)}>
                            {storageChoices.map(choice => <option value={choice}>{choice}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Processor:</label>
                        <select onChange={e => { setProcessor(e.target.value); setActiveProcessorGenChoices(processorGenChoices.filter(containsString(e.target.value.split(' ')[0]))); }} >
                            {processorChoices.map(choice => <option value={choice}>{choice}</option>)}
                        </select>
                        <label>Generation:</label>
                        <select onChange={e => setProcessorGen(e.target.value)}>
                            {activeProcessorGenChoices.map(choice => <option value={choice}>{choice}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Graphics:</label>
                        <select onChange={e => setGraphics(e.target.value)}>
                            {graphicsChoices.map(choice => <option value={choice}>{choice}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={handleButtonCreate} style={ownerCreateStore.button} className='Button-light'>Create</button><br />
                {confirmation.length > 0 && <label>{confirmation}</label>}
            </div>
        </div >
    )
}