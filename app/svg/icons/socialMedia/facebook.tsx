'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { CSSProperties } from "react";

const FacebookIcon = () => {

    const style: CSSProperties = {
        borderRadius: '50%',
        padding: '0',
        fontSize: 'calc(var(--primary-size)*2)',
        color: '#1877F2', 
    };

    return (
        <FontAwesomeIcon style={style} icon={faSquareFacebook} />
    );
};

export default FacebookIcon;
