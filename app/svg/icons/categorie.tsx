import { CSSProperties } from "react";

const CategorieIcon = () => {

    const style: CSSProperties = {
        position: 'absolute',
        top: '15px',
        zIndex: 1000
    }
    return(
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="4" rx="1"></rect>
            <rect x="3" y="10" width="12" height="4" rx="1"></rect>
            <rect x="3" y="16" width="8" height="4" rx="1"></rect>
        </svg>
    )
}
export default CategorieIcon;