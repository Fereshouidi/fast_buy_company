import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { activeLanguageContext } from "../contexts/activeLanguage";
import { CompanyInformationContext } from "../contexts/companyInformation";
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { deleteDiscountById, getAllDiscounts, updateDiscountById, uploadImage } from "../crud";
import './style.css';
import { discountParams } from "../contexts/productSelectForShowing";
import english from '@/app/languages/english.json';
import defaultSticker from '@/app/svg/DALL·E 2025-01-25 09.14.55 - A colorful round sticker with a modern design, featuring a vibrant gradient background (blue, purple, and pink). The sticker should have a subtle shad.webp';
import LoadingIcon from "../svg/icons/loading/loading";
import { BannerContext } from "../contexts/bannerForEverything";
import { LoadingIconContext } from "../contexts/loadingIcon";
import AddDiscountSection from "./addDiscountSection";

type params = {
    exist: boolean,
    setExist: (value: boolean) => void
}
const DiscountsSection = ({exist, setExist}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
    const currencyType = useContext(CompanyInformationContext)?.currencyType;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [allDiscounts, setAllDiscounts] = useState<discountParams[] | undefined>(undefined);
    const [activeDiscount, setActiveDiscount] = useState<discountParams | undefined>(undefined);
    const [isChangeHappen, setIsChangeHappen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingWholePage = useContext(LoadingIconContext)?.setExist;
    const [inputRefs, setInputRefs] = useState<{ [key: string]: React.RefObject<HTMLInputElement> }>({});
    const [addSectionExist, setAddSectionExist] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async() => {
            const discounts = await getAllDiscounts();
            setAllDiscounts(discounts);
            const refs = discounts.reduce((acc, discount) => {
                acc[discount._id] = React.createRef<HTMLInputElement>();
                return acc;
            }, {});
            setInputRefs(refs);
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
        setIsChangeHappen(true);
    }
    const handleNewPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedDiscount = {
            ...activeDiscount,
            newPrice: Number(e.target.value),
            percentage: Number((100 - (Number(e.target.value) / activeDiscount.oldPrice) * 100).toFixed(2))
        };

        setActiveDiscount(updatedDiscount);
        setIsChangeHappen(true);
    }
    const handleDateOfStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const updatedDiscount = ({
                ...activeDiscount,
                startOfDiscount: new Date(e.target.value)
            })
            setActiveDiscount(updatedDiscount);
            setIsChangeHappen(true);
        }
    }
    const handleDateOfEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const updatedDiscount = ({
                ...activeDiscount,
                endOfDiscount: new Date(e.target.value)
            })
            setActiveDiscount(updatedDiscount);
            setIsChangeHappen(true);
        }
    }
    const handleImageSticker = async (e: React.ChangeEvent<HTMLInputElement>, discount: discountParams) => {
        const file = e.target.files?.[0]; 
        if (!file) return;
    
        if (!file.type.startsWith("image/")) {
            alert("The selected file is not an image!");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const result = event.target?.result;
                if (typeof result === "string") {
                    setLoading(true);
                    const uploadedImageUrl = await uploadImage(result);
                    if (uploadedImageUrl) {
                        setActiveDiscount({
                            ...activeDiscount,
                            discountSticker: uploadedImageUrl
                        })
                        setLoading(false);
                        console.log("Uploaded Image URL:", uploadedImageUrl);
                    }
                } else {
                    alert("The type of this picture is unsuitable!");
                }
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };
    
        reader.readAsDataURL(file);
        setIsChangeHappen(true);
    };

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
    const handleStickerClick = async(e: React.MouseEvent<HTMLImageElement>, discount: discountParams) => {
        if (inputRefs[discount._id]?.current) {            
            inputRefs[discount._id].current.click();
        }
        setActiveDiscount(discount);
    }
    
    
    const handleAdd = () => {
        setAddSectionExist(true);
    }
    const handledelete = async() => {
        if (activeDiscount) {
            setLoadingWholePage(true);
            const discountDeleted = deleteDiscountById(activeDiscount._id);
            if (discountDeleted) {
                setAllDiscounts(allDiscounts?.filter(discount => discount._id != activeDiscount._id));
                setActiveDiscount(undefined);
                setIsChangeHappen(false);
                setBanner(true,activeLanguage.discountDeletedP, 'success');
            } else {
                setBanner(true,activeLanguage.unknowErrorP, 'fail');
            }
        }
        setLoadingWholePage(false);
    }
    const handleDone = async() => {
        if (isChangeHappen && setBanner) {
            setLoadingWholePage(true)
            const updatedDiscount = await updateDiscountById(activeDiscount);    
            if (updatedDiscount) {
                setIsChangeHappen(false);
                setBanner(true,activeLanguage.discountUpdatedP, 'success');
            } else {
                setBanner(true,activeLanguage.unknowErrorP, 'fail');
            }
            setLoadingWholePage(false)
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
                <div className="item add-discount" onClick={handleAdd}>
                    <FontAwesomeIcon icon={faPlus}/>
                    <h4>{activeLanguage?.addW}</h4>
                </div>
                <div className="item delete-discount" style={styleTrash} onClick={handledelete}>
                    <FontAwesomeIcon icon={faTrash}/>
                    <h4>{activeLanguage?.deleteW}</h4>
                </div>
                <div className="item done" style={styleDone} onClick={handleDone}>
                    <FontAwesomeIcon icon={faCheck}/>
                    <h4>{activeLanguage?.doneW}</h4>
                </div>
                <div className="fa-x" >
                    <FontAwesomeIcon icon={faX} onClick={() => setExist(false)}/>
                </div>
            </div>

            <section className="display-section">
                {allDiscounts?.length > 0 ? allDiscounts.map((discount) => {
                    return <div key={discount._id} className="cart" onClick={() => {
                        if(activeDiscount?._id != discount._id) {
                            setActiveDiscount(discount);
                            setIsChangeHappen(false);
                        }else {null}
                    }} 
                        style={discount._id == activeDiscount?._id ? styleActiveDiscount : null}>
                        <div className="item">
                            <h4>{activeLanguage?.discountId}:</h4>
                            <span className="id">{discount._id}</span>
                        </div>
                        <div className="item">
                            <h4>{activeLanguage?.oldPriceW}: </h4> 
                            <input type="number" value={discount._id == activeDiscount?._id ? activeDiscount.oldPrice : discount.oldPrice} onChange={(e) => handleOldPrice(e)} />
                            <span>{currencyType}</span>
                        </div>
                        <div className="item">
                            <h4>{activeLanguage?.percentageW}:</h4> 
                            <input type="number" value={discount._id == activeDiscount?._id ? activeDiscount.percentage : discount.percentage} onChange={(e) => handlePercentage(e)}/>% 
                        </div>
                        <div className="item">
                            <h4>{activeLanguage?.newPriceW}:</h4> 
                            <input type="number" value={discount._id == activeDiscount?._id ? activeDiscount.newPrice : discount.newPrice} onChange={(e) => handleNewPrice(e)}/>
                            <span>{currencyType}</span>
                        </div>
                        <div className="item date">
                            <h4>{activeLanguage?.dateOfStartW}: </h4>  
                            <input
                                type="datetime-local"
                                defaultValue={new Date(discount.startOfDiscount).toISOString().slice(0, 16)}
                                onChange={(e) => handleDateOfStart(e)}
                            /> 
                        </div>                        
                        <div className=" item date">
                            <h4>{activeLanguage?.dateOfEndW}: </h4>  
                            <input
                                type="datetime-local"
                                defaultValue={new Date(discount.endOfDiscount).toISOString().slice(0, 16)}
                                onChange={(e) => handleDateOfEnd(e)}
                            />
                        </div>
                        <div className="item">
                            <h4>{activeLanguage?.StickerW}:</h4> 
                            <input type="file" ref={inputRefs[discount._id]} className="file" key={discount._id} onChange={(e) => handleImageSticker(e, discount)}/>
                            <img className="sticker-img" src={discount._id == activeDiscount?._id ? activeDiscount?.discountSticker || defaultSticker.src : discount.discountSticker || defaultSticker.src } onClick={(e) => handleStickerClick(e, discount)} />
                            {loading && discount._id == activeDiscount._id && <LoadingIcon/>}
                        </div>

                    </div>
                    
                }):
                  <div className="no-discounts">{activeLanguage?.noDiscountP}</div>
                }
                <AddDiscountSection exist={addSectionExist} setExist={setAddSectionExist} allDiscounts={allDiscounts} setAllDiscounts={setAllDiscounts}/>
            </section>
        </div>
    )
}
export default DiscountsSection;