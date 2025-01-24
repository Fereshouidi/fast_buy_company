'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import { productParams } from '@/app/contexts/productSelectForShowing';
import Graph from '../smallComponent/graph';
import { profitParams } from '@/app/contexts/types';
import { getProfitOfProductLastWeek } from '@/app/crud';
import EditSection from './editSection';
import ImagesEdit from './imagesEdit';

type params = {
    productDetails: productParams | undefined, 
    setProductDetails: (value: productParams) => void;
}
const ProductDetail = ({productDetails, setProductDetails}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [profitLastWeek, setProfitLastWeek] = useState<profitParams[] | undefined>(undefined);
    const [profitLastMonth, setProfitLastMonth] = useState<profitParams[] | undefined>(undefined);
    const [profitAll, setProfitAll] = useState<profitParams[] | undefined>(undefined);
    const [profitDuration, setProfitDuration] = useState<'lastWeek' | 'lastMounth' | 'all'>('lastWeek');
    const [imagesEditSectionExist, setImagesEditSectionExist] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const profits = await getProfitOfProductLastWeek(productDetails?._id);
            setProfitLastWeek(profits);
        }
        fetchData()
        
    }, [productDetails])

    
    
    

    const styleFaX: CSSProperties = {
        position: 'absolute',
        top: '0',
        left: activeLanguage?.language == 'arabic' ? '0' : '',
        right: activeLanguage?.language == 'arabic' ? '' : '0',
        margin: 'var(--large-margin)'
    }
    return (
        <section className={productDetails ? "whole-section" : 'whole-section-invisible'}> 
            <div className='product-detail-section'>
                <FontAwesomeIcon className='faX' style={styleFaX} icon={faX} onClick={() => setProductDetails(undefined)}/>
                <div className='statistics'>
                    { productDetails && <Graph profits={profitLastWeek} setProfits={setProfitLastWeek} duration={'lastWeek'} />}
                </div>
                
                {productDetails && <EditSection productDetails={productDetails} setProductDetails={setProductDetails} imagesEditSectionExist={imagesEditSectionExist} setImagesEditSectionExist={setImagesEditSectionExist} />}

                <ImagesEdit exist={imagesEditSectionExist} setExist={setImagesEditSectionExist} productDetails={productDetails} setProductDetails={setProductDetails}/>

            </div>
        </section>
    )
}
export default ProductDetail;