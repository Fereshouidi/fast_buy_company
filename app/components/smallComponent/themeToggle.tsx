'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import './style.css'

const TheameToggle = () => {

    return (
        <div className='small-component theame-toggle'>

            <div id='ball-container'>
                <div id='ball'>
                    <FontAwesomeIcon icon={faMoon}/>
                </div>
            </div>

        </div>
    )
}
export default TheameToggle;