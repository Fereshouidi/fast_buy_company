'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties } from "react";
//import { CSSProperties, useContext } from "react";
//import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";

const HeartIcon = () => {

   // const languageContext = useContext(LanguageSelectorContext);


    // const style: CSSProperties = {
    //     width: 'calc(var(--double-size) * 1.2)',
    //     height: 'calc(var(--double-size) * 1.2)',
    //     display: 'flex',
    //     alignItems: "center",
    //     justifyContent: "center",
    //     borderRadius: '50%',
    //     position: 'absolute',
    //     right: languageContext?.activeLanguage != 'arabic' ? 'var(--large-margin)' : '',
    //     left: languageContext?.activeLanguage != 'arabic' ? '' : 'var(--large-margin)',
    //     top: 'var(--large-margin)',
    //     backgroundColor: 'var(--ashen)'
    // }

    const styleIcon: CSSProperties = {
        fontSize: 'var(--double-size)',
        color: 'white'
    }

    return (
        //<div style={style}>
            <FontAwesomeIcon style={styleIcon} icon={faHeart}/>
       // </div>
    )
}
export default HeartIcon;