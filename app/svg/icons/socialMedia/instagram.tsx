'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { CSSProperties } from "react";

const InstagramIcon = () => {
    const style: CSSProperties = {
        borderRadius: '50%',
        padding: '0',
        fontSize: 'calc(var(--primary-size)*2)',
        color: '#E4405F' 
    };

    return (
        <FontAwesomeIcon style={style} icon={faInstagram} />
    );
};

export default InstagramIcon;
