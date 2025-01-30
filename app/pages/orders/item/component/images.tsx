'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { CSSProperties, useContext } from "react";
import { useRouter } from "next/navigation";

type parmas = {
    most3ProductExpensive: productParams[] | undefined
    style: CSSProperties
}
const ImagesDiv = ({most3ProductExpensive, style}: parmas) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const router = useRouter();

    const goToProductDetailsPage = (event: React.MouseEvent<HTMLDivElement>, productId: string) => {
        event.stopPropagation()
        router.push(`/pages/productDetails/${productId}`)
    }
    const styleImage: CSSProperties = {
        width: 'calc(var(--primary-width) /1.5)',
        height: 'calc(var(--primary-width) /1.5)',
        marginRight: activeLanguage?.language == 'arabic'? '' : '-15px',
        marginLeft: activeLanguage?.language == 'arabic'? '-15px' : '',
        borderRadius: '50px',
        backgroundColor: 'var(--ashen)',
    }
    return (
        <div style={style}>{
            most3ProductExpensive?.map((product) => {
                return <img key={product._id} src={product?.imagePrincipal} onClick={(event) => goToProductDetailsPage(event, product._id)} style={styleImage} />
            })
        }</div>
    )
}
export default ImagesDiv;