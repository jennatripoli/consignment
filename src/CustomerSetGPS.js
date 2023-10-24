export default function CustomerSetGPS() {
    const [longitude, setLongitude] = React.useState(customerGPS[0])
    const [latitude, setLatitude] = React.useState(customerGPS[1])
    const [confirmation, setConfirmation] = React.useState(undefined)

    function handleButtonBack() {
        setCurrentPageName(previousPageName)
    }

    function handleButtonSave() {
        setLongitude(document.getElementById('longitude').value)
        setLatitude(document.getElementById('latitude').value)

        if (longitude && latitude)
        {
            setCustomerGPS([longitude, latitude])
            setConfirmation('Save Successful!')

            if (destinationPageName !== currentPageName)
            {
                setTimeout(2000)
                setCurrentPageName(destinationPageName)
            }
        } else setConfirmation('Failed to save GPS, please fill in all fields.')
    }

    return (
        <div className='CustomerSetGPS'>
            <div style={header}>
                <div style={header.title}>Used Computers</div>
                <div style={header.subtitle}><i>Virtual Consignment Site</i></div>
                <button onClick={handleButtonBack} style={header.buttonRight} className='Button-light'>Back</button>
            </div>

            <div style={customerSetGPS}>
                <div style={customerSetGPS.title}>-- SET GPS LOCATION --</div>
                <div style={customerSetGPS.gps}>
                    <label>Longitude:&emsp;</label>
                    <input id='longitude' type='number' value={longitude} onChange={e => setLongitude(e.target.value)} style={customerSetGPS.entry} className='Entry-light'></input>
                    <br /><br />
                    <label>Latitude:&emsp;&nbsp;&nbsp;&nbsp;</label>
                    <input id='latitude' type='number' value={latitude} onChange={e => setLatitude(e.target.value)} style={customerSetGPS.entry} className='Entry-light'></input>
                </div>
                <button onClick={handleButtonSave} style={customerSetGPS.button} className='Button-light'>Save</button><br />
                <label>{confirmation}</label>
            </div>
        </div>
    )
}