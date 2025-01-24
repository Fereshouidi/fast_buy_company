'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './style.css';
import { CSSProperties, useContext } from "react";
import { ActiveImageContext } from "@/app/contexts/activeImageForComputer";
import { ProductSelectContext } from "@/app/contexts/productSelectForShowing";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";

const RightArrow = () => {

    const activeImageContext = useContext(ActiveImageContext);
    const productSelect = useContext(ProductSelectContext)?.product;
    const languageContext = useContext(LanguageSelectorContext);

    const currentIndex = activeImageContext?.activeImageIndex || 0 ;
    const imagesLength = productSelect?.images.length || 0;

    const handleClick = () => {
        if(currentIndex + 2 <= imagesLength && languageContext?.activeLanguage != 'arabic'){
            activeImageContext?.setActiveImageIndex(prev => prev + 1)
        }else if(currentIndex != 0  && languageContext?.activeLanguage == 'arabic'){
            activeImageContext?.setActiveImageIndex(prev => prev - 1)
        }
        //alert(imagesLength + ' / ' + (currentIndex + 1)) 
    }
 

    const style: CSSProperties = {
        right: 0,
    }
    return (
        <div style={style} className="arrow arrowForImageDisplay" onClick={handleClick}>
            <FontAwesomeIcon icon={faChevronRight}/>
        </div>
    )
}
export default RightArrow
