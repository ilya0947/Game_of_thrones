import './errorMessage.scss';
import img from './0-15.jpg'

export default function ErrorMessage() {

    return (
        <>
            <img src={img} alt="error" />
            <span className='select-error'>Error</span>
        </>
    )
}