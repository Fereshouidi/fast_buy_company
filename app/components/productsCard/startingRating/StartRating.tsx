
import ReactStars from 'react-stars';
import './reactStars.css';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { useContext } from 'react';

type productParams = {
    name: LanguageParams,
    imagePrincipal: string,
    price: number,
    discount: discountParams,
    totalRating: number,
    currencyType: string

}

type LanguageParams = {
    english: string,
    arabic: string
}


type discountParams = {
    createdAt: Date,
    discountSticker: string,
    newPrice: number,
    oldPrice: number,
    percentage: number,
    startOfDiscount: Date, 
    endOfDiscount: Date
};

const StarRating = ({product}: {product : productParams}) => {

    const companyInformation = useContext(CompanyInformationContext)
    return (
        <ReactStars
            count={5}
            size={18} 
            value={product.totalRating}
            edit={false} 
            color2={`${companyInformation?.primaryColor}`} 
            className='react-stars'
        />
    );
};

export default StarRating;
