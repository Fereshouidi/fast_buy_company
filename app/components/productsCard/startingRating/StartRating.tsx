
import ReactStars from 'react-stars';
import './reactStars.css';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { useContext } from 'react';
import { productParams } from '@/app/contexts/productSelectForShowing';


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
