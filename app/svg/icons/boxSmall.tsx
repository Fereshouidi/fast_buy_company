'use client';
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useContext } from "react";

const BoxIcon = () => {

    const companyInformation = useContext(CompanyInformationContext) 
    
    const style:CSSProperties ={
        color: `${companyInformation?.primaryColor}`,
        margin: 'calc( var(--small-margin)/1.5) calc( var(--small-margin)/10)',
        fontSize: 'calc(var(--small-size)/1.2)'
    }
    return(
        <div style={style}>
            <FontAwesomeIcon icon={faBoxArchive}/>
        </div>
    )
}
export default BoxIcon;