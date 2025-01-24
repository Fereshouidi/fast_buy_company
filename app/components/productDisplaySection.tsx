'use client';

import { productParams } from "../contexts/productSelectForShowing";
import Card from "./productsCard/card";
import { ActiveLanguageContext } from "../contexts/activeLanguage";
import { CSSProperties, useContext } from "react";

type params = {
    products: productParams[] | undefined
    setProducts: (value: productParams[]) => void,
    productDetails: productParams | undefined, 
    setProductDetails: (value: productParams) => void;
}
const ProductDisplaySection = ({products, setProducts, productDetails, setProductDetails}: params) => {

    const activeLanguage = useContext(ActiveLanguageContext).activeLanguage;
    

    const styleSection: CSSProperties = {
        paddingLeft: activeLanguage.language == 'arabic' ? '' : 'calc(var(--extra-long-width) /1.5)',
        paddingRight: activeLanguage.language == 'arabic' ? 'calc(var(--extra-long-width) /1.5)' : '',
    }

    return (
        <div className="product-displays-section" style={styleSection}>
            <div className="container">
                {products?.map((product, index) => {
                    return <div key={index} onClick={() => setProductDetails(product)}>
                        <Card product={product} />
                    </div>
                })}

                {products?.length == 0  && <div>{activeLanguage.noResultW} !</div>}
            </div>

        </div>
    )
}
export default ProductDisplaySection;