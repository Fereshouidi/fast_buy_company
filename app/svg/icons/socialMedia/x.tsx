'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { CSSProperties } from "react";

const XIcon = () => {
    const style: CSSProperties = {
        borderRadius: '50%',
        padding: '0',
        fontSize: 'calc(var(--primary-size)*2)',
        color: 'white'
    };

    return (
        <FontAwesomeIcon style={style} icon={faXTwitter} />
    );
};

export default XIcon;
