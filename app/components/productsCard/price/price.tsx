'use client';
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { CSSProperties, useContext, useState } from "react";
import tinycolor from "tinycolor2";
import { productParams } from "@/app/contexts/productSelectForShowing";


const Price = ({product}: {product : productParams}) => {

  const companyInformation = useContext(CompanyInformationContext)
  const languageContext = useContext(LanguageSelectorContext);
  const [price_Hover, setPrice_Hover] = useState(false);


  if(!languageContext){
    throw 'error languageContext'
  }
  
const darkenedColor = tinycolor(companyInformation?.primaryColor || '#111111').darken(10).toString();  

const stylePriceDiv: CSSProperties = {
  direction: languageContext.activeLanguage == 'arabic'? 'rtl' : 'ltr'
}
const stylediscountPricesDiv: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  direction: languageContext.activeLanguage == 'arabic'? 'rtl' : 'ltr'
}
const styleoldPrice: CSSProperties = {
  margin: 'var(--small-margin)',
  textDecoration: 'line-through',
  color: 'var(--black)'
}
const styleNewPrice: CSSProperties = {
  margin: 'var(--small-margin)',
  backgroundColor: `${companyInformation?.primaryColor}`,
  padding: 'var(--medium-padding)',
  borderRadius: '50px',
  color: 'white'
}
const price: CSSProperties = {
  margin: 'var(--small-margin)',
  padding: 'var(--medium-padding)',
  borderRadius: '50px',
  color: 'var(--black)'
}
const newPriceHover: CSSProperties = {
  ...styleNewPrice,
  backgroundColor: darkenedColor
}

  
    return (
        <div style={stylePriceDiv}>
          {product.discount ? (
            <div style={stylediscountPricesDiv}>
              <h5 style={styleoldPrice}>{product.discount.oldPrice+ ' ' +companyInformation?.currencyType|| "N/A"}</h5>
              <h4 style={price_Hover? newPriceHover: styleNewPrice}
                onMouseEnter={() => setPrice_Hover(true)} 
                onMouseLeave={() => setPrice_Hover(false)}
              >{product.discount.newPrice+ ' ' +companyInformation?.currencyType|| "N/A"}</h4>
            </div>
          ) : (
            <h4 style={price} >{product.price+ ' ' +companyInformation?.currencyType || "N/A"}</h4>
          )}
        </div>
      );
}
export default Price;