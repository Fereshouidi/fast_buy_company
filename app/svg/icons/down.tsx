'use client';

import { CSSProperties, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const DownIcon = () => {

    const [hover, setHover] = useState<boolean>(false);


    const style: CSSProperties = {
        fontSize: 'var(--small-size)',
        backgroundColor: 'transparent',
        zIndex: 0,
    }
    const styleHover: CSSProperties = {
        ...style,
        backgroundColor: 'var(--primary-color-clicked)'

    }

    return (
        <FontAwesomeIcon style={hover? styleHover: style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} icon={faChevronDown } />

    )
}
export default DownIcon;