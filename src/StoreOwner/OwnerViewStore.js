import { useParams, useNavigate } from 'react-router-dom'


export default function OwnerViewStore(props) {
    const { storeName } = useParams()
    const navigate = useNavigate()

    return (
        <div>
            {storeName}
            <button onClick={e => navigate('/OwnerAddComputer', { state: { store: storeName } })}> Add Computer </button>
            <button onClick={e => navigate(-1)}> Back </button>
        </div>
    )
}