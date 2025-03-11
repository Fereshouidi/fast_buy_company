'use client';

import { CSSProperties, useContext, useState } from "react";
import Price from "./price/price";
import BoxIcon from "@/app/svg/icons/box";
import StarRating from "./startingRating/StartRating";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { useRouter } from "next/navigation";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import '@/app/svg/icons/loading/loading.css';
import { productParams } from "@/app/contexts/productSelectForShowing";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";

type params = {
    product : productParams
    style?: CSSProperties
    cardHover?: boolean
    setCardHover?: (value: boolean) => void
}
const Card = ({product, style, cardHover, setCardHover}: params) => {

    const router = useRouter();

const languageContext = useContext(LanguageSelectorContext)
const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
const primaryColor = useContext(CompanyInformationContext)?.primaryColor;

// const [cardHover, setCardHover] = useState<boolean>(false);


if(!languageContext){
    throw 'error languageContext'
  }
  if(!setLoadingIcon){
      return;
  }


const setHover = () => {
    setCardHover(true)
}
const unsetHover = () => {
    setCardHover(false)
}

function hexToRGBA(hex, alpha = 0.5) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

    const Style: CSSProperties = {
        ...style,
        width: '250px',
        height: '350px',
        borderRadius: '20px',
        margin: 'var(--medium-margin)',
        padding: 'var(--small-padding)',
        cursor: "pointer",
        transition: '0.2s ease',
        zIndex: 5,

    }
    const StyleWithHover: CSSProperties = {
        ...Style,
       backgroundColor: hexToRGBA(primaryColor, 0.2),
       transition: '0s'
    }
    const StyleImage: CSSProperties = {
        width: '100%',
        height: '70%',
        objectFit: 'cover',
        borderRadius: '20px',
        backgroundColor: 'var(--almost-white)',
    }
    const styleH4: CSSProperties = {
        padding: 'calc(var(--small-padding)/1.5)',
        color: 'var(--black)'
    }
    const StyleCartInformation: CSSProperties = {
        width: '100%',
        height: '29%',
        borderRadius: '20px',
        position: 'relative'
    }
    const styleBoxAndPricesDiv: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        position: 'absolute',
        left: '0',
        bottom: '0',
        width: '100%',
        direction: languageContext.activeLanguage == 'arabic'? 'rtl' : 'ltr'
    }
    return(
        <div id="card" style={cardHover? StyleWithHover : Style}>
            <img src={product.imagePrincipal} alt="" style={StyleImage} />
            <div style={StyleCartInformation}>
            <h4 style={styleH4}>{
                    languageContext.activeLanguage == "english" ?
                    product.name?.english.length > 15 ? 
                        product.name?.english.slice(0, 15) + '...'
                        : product.name?.english ?? ''
                    : product.name?.arabic.length > 15 ?
                        product.name?.arabic.slice(0, 15) + '...'
                        : product.name?.arabic ?? ''   
                }</h4>
                <StarRating product={product}/>
                <div style={styleBoxAndPricesDiv}>
                    <BoxIcon  />
                    <Price product={product}/>
                </div>
            </div>
        </div>
    )
}
export default Card;