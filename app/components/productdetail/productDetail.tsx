'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import { productParams } from '@/app/contexts/productSelectForShowing';
import Graph from '../smallComponent/graph';
import { profitParams } from '@/app/contexts/types';
import { getProfitOfProductLastWeek, getPurchasesByProduct, getReviewsByProduct, getDeliveredPurchasesByProduct } from '@/app/crud';
import EditSection from './editSection';
import ImagesEdit from './imagesEdit';
import { reviewParams } from '@/app/contexts/reviews';
import ReviewsSection from './reviewSection/reviewSection';
import { purchaseParams } from '@/app/contexts/purchaseData';
import InPurchaseSection from './inPurchaseSection/inPurchaseSection';
import BuyersSection from './buyersSection/buyersSection';
import { CustomerDataParams } from '@/app/contexts/customerData';

type params = {
    productDetails: productParams | undefined, 
    setProductDetails: (value: productParams) => void;
    allProducts: productParams[],
    setAllProducts: (value: productParams[]) => void;
}
export type buyingDataParams = {
    customer: CustomerDataParams | undefined, 
    quantity: number, 
    lastBuyingDate: Date
}

const ProductDetail = ({productDetails, setProductDetails, allProducts, setAllProducts}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [profitLastWeek, setProfitLastWeek] = useState<profitParams[] | undefined>(undefined);
    const [profitLastMonth, setProfitLastMonth] = useState<profitParams[] | undefined>(undefined);
    const [profitAll, setProfitAll] = useState<profitParams[] | undefined>(undefined);
    const [profitDuration, setProfitDuration] = useState<'lastWeek' | 'lastMounth' | 'all'>('lastWeek');
    const [imagesEditSectionExist, setImagesEditSectionExist] = useState<boolean>(false);
    const [allProductReviews, setAllProductReviews] = useState<reviewParams[] | undefined>(undefined);
    const [reviewsSectionExist, setReviewsSectionExist] = useState<boolean>(false);
    const [allProductInPurchase, setAllProductInpurchse] = useState<purchaseParams[] | undefined>(undefined);
    const [inPurchaseSectionExist, setInPurchaseSectionExist] = useState<boolean>(false);
    const [allProductBuyers, setAllProductBuyers] = useState<purchaseParams[] | undefined>(undefined);
    const [buyerectionExist, setBuyerSectionExist] = useState<boolean>(false);
    const [buyingDataList, setBuyingDataList] = useState<buyingDataParams[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            const profits = await getProfitOfProductLastWeek(productDetails?._id);
            const reviews = await getReviewsByProduct(productDetails?._id);
            const inPurchases = await getPurchasesByProduct(productDetails?._id);
            const delivered = await getDeliveredPurchasesByProduct(productDetails?._id)
            setProfitLastWeek(profits);
            setAllProductReviews(reviews);
            setAllProductInpurchse(inPurchases);
            setAllProductBuyers(delivered);

            
        }
        fetchData()
        
    }, [productDetails])

    
    useEffect(() => {
        if (allProductBuyers) {

            function calculateBuyerData(buyerId) {
                let totalQuantity = 0;
                let lastPurchaseDate = null;
                let customer = undefined;
                const currentDate = new Date(); 
            
                allProductBuyers.forEach(purchase => {
                    if (purchase.buyer._id === buyerId) {
                        totalQuantity += purchase.quantity;
                        customer = purchase.buyer;
            
                        const purchaseDate = new Date(purchase?.orderedAt);
                        if (!lastPurchaseDate || purchaseDate > lastPurchaseDate) {
                            lastPurchaseDate = purchaseDate;
                        }
                    }
                });
                            
                return {
                    customer: customer,
                    quantity: totalQuantity,
                    lastBuyingDate: lastPurchaseDate
                };
            }
            
            function handleBuyerData() {
                const uniqueBuyers = new Set();
                const buyerDataList = [];
            
                allProductBuyers.forEach(purchase => {
                    const buyerId = purchase.buyer._id;
                    if (!uniqueBuyers.has(buyerId)) {
                        uniqueBuyers.add(buyerId);
                        buyerDataList.push(calculateBuyerData(buyerId));
                    }
                });
            
                setBuyingDataList(buyerDataList)
                 return buyerDataList;
            }

            const resul = handleBuyerData()
            console.log(resul);
            
        }
    }, [allProductBuyers])
    
    

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
                <div className={productDetails ? 'statistics' : 'invisible'}>
                    { productDetails && <Graph profits={profitLastWeek} setProfits={setProfitLastWeek} duration={'lastWeek'} />}
                    <div className='other-statistics'>
                        <h5 className='product-id'>
                            <span>{activeLanguage?.productIdW} :</span>
                            <p>{productDetails?._id}</p>
                        </h5>
                        <h5 onClick={() => setBuyerSectionExist(true)}>
                            <span >{activeLanguage?.buyersW} :</span>
                            <p>{buyingDataList?.length}</p>
                        </h5>
                        <h5 onClick={() => setInPurchaseSectionExist(true)}>
                            <span>{activeLanguage?.inPurchaseW} :</span>
                            <p>{allProductInPurchase?.length}</p>
                        </h5>
                        <h5 onClick={() => setReviewsSectionExist(true)}>
                            <span>{activeLanguage?.reviewsW} :</span>
                            <p>{productDetails?.evaluators.length}</p>
                        </h5>
                    </div>
                </div>
                
                {productDetails && <EditSection productDetails={productDetails} setProductDetails={setProductDetails} allProducts={allProducts} setAllProducts={setAllProducts} imagesEditSectionExist={imagesEditSectionExist} setImagesEditSectionExist={setImagesEditSectionExist} />}

                <ImagesEdit exist={imagesEditSectionExist} setExist={setImagesEditSectionExist} productDetails={productDetails} setProductDetails={setProductDetails}/>
                <ReviewsSection exist={reviewsSectionExist} setExist={setReviewsSectionExist} reviews={allProductReviews}/>
                <InPurchaseSection exist={inPurchaseSectionExist} setExist={setInPurchaseSectionExist} purchases={allProductInPurchase}/>
                <BuyersSection exist={buyerectionExist} setExist={setBuyerSectionExist} buyingDataList={buyingDataList}/>
            </div>
        </section>
    )
}
export default ProductDetail;