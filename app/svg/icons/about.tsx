import { CSSProperties } from "react";

const AboutIcon = () => {

    const style:CSSProperties = {
        color: 'var(black)'
    }
    return(
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <circle cx="12" cy="8" r="1"></circle>
        </svg>

    )
}
export default AboutIcon;