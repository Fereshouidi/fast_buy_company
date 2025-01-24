'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { ActiveLanguageContext } from "../contexts/activeLanguage";
import { CompanyInformationContext } from "../contexts/companyInformation";
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { getAllDiscounts } from "../crud";
import './style.css';
import { discountParams } from "../contexts/productSelectForShowing";

type params = {
    exist: boolean,
    setExist: (value: boolean) => void
}
const DiscountsSection = ({exist, setExist}: params) => {

    
    const activeLanguage = useContext(ActiveLanguageContext).activeLanguage;
    const currencyType = useContext(CompanyInformationContext).currencyType;
    const primaryColor = useContext(CompanyInformationContext).primaryColor;
    const [allDiscounts, setAllDiscounts] = useState<discountParams[] | undefined>(undefined);
    const [activeDiscount, setActiveDiscount] = useState<discountParams | undefined>(undefined);
    const [isChangeHappen, setIsChangeHappen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async() => {
            const discounts = await getAllDiscounts();
            setAllDiscounts(discounts);            
        }
        fetchData();
    }, [])

    const handleOldPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedDiscount = {
            ...activeDiscount,
            oldPrice: Number(e.target.value),
            percentage: Math.floor(((activeDiscount?.newPrice?? 0) / Number(e.target.value)) * 100)
        };
    
        setActiveDiscount(updatedDiscount);
    
        // setAllDiscounts(
        //     allDiscounts.map(discount => 
        //         discount._id === activeDiscount?._id ? updatedDiscount : discount
        //     )
        // );
        setIsChangeHappen(true);
    }
    const handlePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const percentage = Number(e.target.value);
        const updatedDiscount = {
            ...activeDiscount,
            percentage: percentage,
            newPrice: Number(((activeDiscount?.oldPrice?? 0) * (1 - percentage / 100)).toFixed(2))
        };
    
        setActiveDiscount(updatedDiscount);
    
        // setAllDiscounts(
        //     allDiscounts.map(discount => 
        //         discount._id === activeDiscount?._id ? updatedDiscount : discount
        //     )
        // );
        setIsChangeHappen(true);
    }
    const handleNewPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedDiscount = {
            ...activeDiscount,
            newPrice: Number(e.target.value),
            percentage: Number((100 - (Number(e.target.value) / activeDiscount.oldPrice) * 100).toFixed(2))
        };

        setActiveDiscount(updatedDiscount);

        // setAllDiscounts(
        //     allDiscounts.map(discount => 
        //         discount._id === activeDiscount._id ? updatedDiscount : discount
        //     )
        // );
        setIsChangeHappen(true);
    }
    const handleDateOfStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const updatedDiscount = ({
            ...activeDiscount,
            startOfDiscount: new Date(e.target.value)
        })

        setActiveDiscount(updatedDiscount);

        // setAllDiscounts(
        //     allDiscounts.map(discount => 
        //         discount._id === activeDiscount._id ? updatedDiscount : discount
        //     )
        // );
        setIsChangeHappen(true);
    }
    const handleDateOfEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const updatedDiscount = ({
                ...activeDiscount,
                endOfDiscount: new Date(e.target.value)
            })
            
            setActiveDiscount(updatedDiscount);
        }


        // setAllDiscounts(
        //     allDiscounts.map(discount => 
        //         discount._id === activeDiscount._id ? updatedDiscount : discount
        //     )
        // );
    }

    useEffect(() => {
        console.log(activeDiscount);
        console.log(allDiscounts);
    }, [activeDiscount, allDiscounts])

    const handleDate = (date: Date) => {
        const date_ = new Date(date);
        const year = date_.getFullYear();
        const month = date_.getMonth() +1;
        const day = date_.getDate();
        const hour = date_.getHours()
        const minute = date_.getMinutes()

        const formatDate = `${year}/${month}/${day}  ${hour}:${minute}`;        
        return formatDate;
    }
    const handleDone = () => {
        if (isChangeHappen) {
            setIsChangeHappen(false);
        }
    }

    const styleActiveDiscount: CSSProperties = {
        border:  `2px solid ${primaryColor}`
    }
    const styleTrash: CSSProperties = {
        backgroundColor: activeDiscount ? 'red': ''
    }
    const styleDone: CSSProperties = {
        backgroundColor: isChangeHappen ? 'green': 'var(--ashen-semi-transparent)'
    }
    return (
        <div id="Discounts-Section" className={exist? '' : 'invisible'}>

            <div className="header">
                <div className="item add-discount" >
                    <FontAwesomeIcon icon={faPlus}/>
                    <h4>{activeLanguage.addPictureW}</h4>
                </div>
                <div className="item delete-discount" style={styleTrash} >
                    <FontAwesomeIcon icon={faTrash}/>
                    <h4>{activeLanguage.deleteW}</h4>
                </div>
                <div className="item done" style={styleDone} onClick={handleDone}>
                    <FontAwesomeIcon icon={faCheck}/>
                    <h4>{activeLanguage.doneW}</h4>
                </div>
                <div className="fa-x" >
                    <FontAwesomeIcon icon={faX} onClick={() => setExist(false)}/>
                </div>
            </div>

            <section className="display-section">
                {allDiscounts?.map((discount, index) => {
                    return <div key={index} className="cart" onClick={() => activeDiscount?._id != discount._id ? setActiveDiscount(discount) : null} style={discount._id == activeDiscount?._id ? styleActiveDiscount : null}>
                        <div className="item">
                            <h4>{activeLanguage.discountId}:</h4>
                            <span className="id">{discount._id}</span>
                        </div>
                        <div className="item">
                            <h4>{activeLanguage.oldPriceW}: </h4> 
                            <input type="number" value={discount._id == activeDiscount?._id ? activeDiscount.oldPrice : discount.oldPrice} onChange={(e) => handleOldPrice(e)} />
                            <span>{currencyType}</span>
                        </div>
                        <div className="item">
                            <h4>{activeLanguage.percentageW}:</h4> 
                            <input type="number" value={discount._id == activeDiscount?._id ? activeDiscount.percentage : discount.percentage} onChange={(e) => handlePercentage(e)}/>%
                        </div>
                        <div className="item">
                            <h4>{activeLanguage.newPriceW}:</h4> 
                            <input type="number" value={discount._id == activeDiscount?._id ? activeDiscount.newPrice : discount.newPrice} onChange={(e) => handleNewPrice(e)}/>
                            <span>{currencyType}</span>
                        </div>
                        <div className="item date">
                            <h4>{activeLanguage.dateOfStartW}: </h4>  
                            <input
                                type="datetime-local"
                                value={discount.startOfDiscount ? new Date(discount.startOfDiscount).toISOString().slice(0, 16) : ""}
                                onChange={(e) => handleDateOfStart(e)}
                            /> 
                        </div>                        
                        <div className=" item date">
                            <h4>{activeLanguage.dateOfEndW}: </h4>  
                            <input
                                type="datetime-local"
                                defaultValue={new Date(discount.startOfDiscount).toISOString().slice(0, 16)}
                                value={discount._id != activeDiscount?._id ? new Date(discount.startOfDiscount).toISOString().slice(0, 16) : null}
                                onChange={(e) => handleDateOfEnd(e)}
                            />

                        </div>

                    </div>
                })}
            </section>

        </div>
    )
}
export default DiscountsSection;