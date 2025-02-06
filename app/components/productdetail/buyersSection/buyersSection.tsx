'use client';

import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useContext, useEffect, useState } from "react";
import Item from "./item";
import { reviewParams } from "@/app/contexts/reviews";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { purchaseParams } from "@/app/contexts/purchaseData";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { CustomerDataParams } from "@/app/contexts/customerData";
import { getDeliveredPurchasesByBuyer, getDeliveredPurchasesByProduct, getPurchasesByCustomerProduct } from "@/app/crud";
import { buyingDataParams } from "../productDetail";

type params = {
    exist: boolean,
    setExist: (value: boolean) => void;
    purchases?: purchaseParams[] | undefined,
    setPurchases?: (value: purchaseParams[]) => void;
    buyingDataList?: buyingDataParams[]
}

// type buyingDataParams = {
//     customer: CustomerDataParams | undefined, 
//     quantity: number, 
//     lastBuyingDate: Date
// }
const BuyersSection = ({exist, setExist, buyingDataList}: params) => {

    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    // const [buyingDataList, setBuyingDataList] = useState<buyingDataParams[]>([]);

    // useEffect(() => {
    //     if (purchases) {

    //         function calculateBuyerData(buyerId) {
    //             let totalQuantity = 0;
    //             let lastPurchaseDate = null;
    //             let customer = undefined;
    //             const currentDate = new Date(); 
            
    //             purchases.forEach(purchase => {
    //                 if (purchase.buyer._id === buyerId) {
    //                     totalQuantity += purchase.quantity;
    //                     customer = purchase.buyer;
            
    //                     const purchaseDate = new Date(purchase?.createdAt);
    //                     if (!lastPurchaseDate || purchaseDate > lastPurchaseDate) {
    //                         lastPurchaseDate = purchaseDate;
    //                     }
    //                 }
    //             });
                            
    //             return {
    //                 customer: customer,
    //                 quantity: totalQuantity,
    //                 lastBuyingDate: lastPurchaseDate
    //             };
    //         }
            
    //         function handleBuyerData() {
    //             const uniqueBuyers = new Set();
    //             const buyerDataList = [];
            
    //             purchases.forEach(purchase => {
    //                 const buyerId = purchase.buyer._id;
    //                 if (!uniqueBuyers.has(buyerId)) {
    //                     uniqueBuyers.add(buyerId);
    //                     buyerDataList.push(calculateBuyerData(buyerId));
    //                 }
    //             });
            
    //             setBuyingDataList(buyerDataList)
    //              return buyerDataList;
    //         }

    //         //   purchases?.forEach(purchase => {
    //         //     const buyingData = calculateBuyerData(purchase.buyer._id);
    //         //     setBuyingDataList((prev: buyingDataParams[]) => [...prev, buyingData as buyingDataParams])

    //         // })
    //         const resul = handleBuyerData()
    //         console.log(resul);
            
    //     }
    // }, [purchases])
    
    //console.log(buyingDataList);
    

    const styleBannerContainer: CSSProperties = {
        position: 'fixed',
        zIndex: 998,
        top: 'var(--header-height)',
        left: '0',
        backgroundColor: 'var(--black-almost-transparnt)',
        width: '100vw',
        height: 'calc(100vh - var(--header-height))',
        display: exist? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center'
    }
    const style: CSSProperties = {
        backgroundColor: 'var(--white)',
        border: `1px solid ${primaryColor}`,
        padding: '0 var(--medium-padding)',
        borderRadius: '20px',
        width: 'calc(var(--extra-long-width) *2)',
        maxHeight: '80%',
        overflow: 'scroll',
        scrollbarWidth: 'none',
        position: 'relative'
    }
    const styleContainer: CSSProperties = {
        height: '100%',
        padding: 'var(--medium-padding)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
    const styleHeader: CSSProperties = {
        direction: 'rtl',
        position: 'sticky',
        backgroundColor: 'var(--white)',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 999,
        padding: 'var(--large-padding)',
        margin: 0,
        borderRadius: '0 0 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const styleFaBan: CSSProperties = {
        cursor: 'pointer',
        fontSize: 'var(--primary-size)'
    }
    const styleReviewsWDiv: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const styleReviewsNum: CSSProperties = {
        margin: '0 var(--small-margin)'
    }
    const styleNoReviewsDiv: CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--primary-size)',
        padding: 'var(--medium-padding) 0',
        opacity: 0.7
    }

    return (
        <div 
            className={exist? 'in-purchases-section': 'invisible'}
            style={styleBannerContainer}
        >

            <div style={style}>
                <div className="banner">

                <div className="header" style={styleHeader}>

                    <FontAwesomeIcon icon={faX} style={styleFaBan} onClick={() => setExist(false)}/> 
                    <div style={styleReviewsWDiv}>
                        <span style={styleReviewsNum}>{'['+ buyingDataList?.length +']'}</span>
                        <h5>{activeLanguage?.buyersW}</h5>
                    </div>
                    <h1></h1>
                    
                </div>

                    <div className="content" style={styleContainer}>{

                        buyingDataList && buyingDataList.length > 0 ? 
                                                
                        buyingDataList.map((item, index) => {
                            return <Item key={index} buyingData={item}/>
                        }) 

                        : <div style={styleNoReviewsDiv}>{activeLanguage?.noInPurchaseP}</div>

                    }</div>

                </div>
            </div>

        </div>
    )
}
export default BuyersSection;