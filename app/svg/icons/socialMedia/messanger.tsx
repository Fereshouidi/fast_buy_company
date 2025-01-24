'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { CSSProperties } from "react";

const MessengerIcon = () => {
    const style: CSSProperties = {
        borderRadius: '50%',
        padding: '0',
        fontSize: 'calc(var(--primary-size)*2)',
        color: '#0084FF' 
    };

    return (
        <FontAwesomeIcon style={style} icon={faFacebookMessenger} />
    );
};

export default MessengerIcon;
