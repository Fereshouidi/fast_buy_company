import { CSSProperties } from "react";

const LightModeIcon = () => {

    const style: CSSProperties = {
        // padding: '0',
        // width: '20px',
        // height: '20px'
    }
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1V3" />
            <path d="M12 21V23" />
            <path d="M4.22 4.22L5.64 5.64" />
            <path d="M18.36 18.36L19.78 19.78" />
            <path d="M1 12H3" />
            <path d="M21 12H23" />
            <path d="M4.22 19.78L5.64 18.36" />
            <path d="M18.36 5.64L19.78 4.22" />
        </svg>

    )
}
export default LightModeIcon;