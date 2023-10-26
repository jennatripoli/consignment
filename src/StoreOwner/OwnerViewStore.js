import { useParams } from 'react-router-dom'


export default function OwnerViewStore(props) {
    const { storeName } = useParams()

    return (
        <div>
            {storeName}
        </div>
    )
}