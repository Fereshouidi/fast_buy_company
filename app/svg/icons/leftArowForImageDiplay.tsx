'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties, useContext } from "react";
import { ActiveImageContext } from "@/app/contexts/activeImageForComputer";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { ProductSelectContext } from "@/app/contexts/productSelectForShowing";

const LeftArrow = () => {

    const activeImageContext = useContext(ActiveImageContext);
    const languageContext = useContext(LanguageSelectorContext);
    const productSelect = useContext(ProductSelectContext)?.product;

    const imagesLength = productSelect?.images.length || 0;

    const currentIndex = activeImageContext?.activeImageIndex || 0 ;

    const handleClick = () => {
        if(currentIndex != 0 && languageContext?.activeLanguage != 'arabic'){
            activeImageContext?.setActiveImageIndex(prev => prev - 1)
        }else if(currentIndex +2 < imagesLength && languageContext?.activeLanguage == 'arabic'){
            activeImageContext?.setActiveImageIndex(prev => prev + 1)
        }
    }

    const style: CSSProperties = {
        left: 0,
    }

    return (
        <div style={style} className="arrow arrowForImageDisplay" onClick={handleClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    )
}
export default LeftArrow