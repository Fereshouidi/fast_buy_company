'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { CSSProperties } from "react";

const WhatsAppIcon = () => {
    const style: CSSProperties = {
        borderRadius: '50%',
        padding: '0',
        fontSize: 'calc(var(--primary-size)*2)',
        color: '#25D366' 
    };

    return (
        <FontAwesomeIcon style={style} icon={faWhatsapp} />
    );
};

export default WhatsAppIcon;
