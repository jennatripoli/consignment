import { memo, useState } from "react"
import { header, ownerCreateStore } from "../Layout"
import { useLocation, useNavigate } from "react-router-dom"

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

    let memoryChoices = ['32 GB', '16 GB', '12 GB', '8 GB', '4 GB', '1 GB']
    let storageChoices = ['2 TB', '1 TB', '512 GB', '256 GB', '128 GB']
    let processorChoices = ['AMD', 'Intel', 'Intel Xeon', 'Intel i9', 'Intel i7', 'AMD Ryzen 9', 'AMD Ryzen 7']
    let processorGenChoices = ['13th Gen Intel', '12th Gen Intel', '11th Gen Intel', 'AMD Ryzen 7000 Series', 'AMD Ryzen 6000 Series']
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
                <div style={ownerCreateStore.store}>
                    <label>Price:&emsp;</label>
                    <input id='price' type='text' value={price} onChange={e => setPrice(e.target.value)} style={ownerCreateStore.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Memory:&emsp;&nbsp;&nbsp;&nbsp;</label>
                    <select>
                        {memoryChoices.map(choice => <option onChange={e => setMemory(e.target.value)} value={choice}>{choice}</option>)}
                    </select>
                    <br /><br />
                    <label>Storage:&emsp;&emsp;</label>
                    <select>
                        {storageChoices.map(choice => <option onChange={e => setStorage(e.target.value)} value={choice}>{choice}</option>)}
                    </select>
                    <br /><br />
                    <label>Processor:&emsp;&nbsp;&nbsp;</label>
                    <select>
                        {processorChoices.map(choice => <option onChange={e => setProcessor(e.target.value)} value={choice}>{choice}</option>)}
                    </select>
                    <br /><br />
                    <label>Processor Generation:&emsp;&emsp;&nbsp;</label>
                    <select>
                        {processorGenChoices.map(choice => <option onChange={e => setProcessorGen(e.target.value)} value={choice}>{choice}</option>)}
                    </select>
                    <br /><br />
                    <label>Graphics:&emsp;&emsp;&nbsp;</label>
                    <select>
                        {graphicsChoices.map(choice => <option onChange={e => setGraphics(e.target.value)} value={choice}>{choice}</option>)}
                    </select>
                </div>
                <button onClick={handleButtonCreate} style={ownerCreateStore.button} className='Button-light'>Create</button><br />
                {confirmation.length > 0 && <label>{confirmation}</label>}
            </div>
        </div >
    )
}