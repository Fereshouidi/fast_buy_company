'use client';

import { useContext, useEffect, useRef, useState } from "react";
import { activeLanguageContext } from "../contexts/activeLanguage";
import { CompanyInformationContext } from "../contexts/companyInformation";
import { addDiscount, uploadImage } from "../crud";
import { discountParams } from "../contexts/productSelectForShowing";
import { BannerContext } from "../contexts/bannerForEverything";
import { LoadingIconContext } from "../contexts/loadingIcon";
import LoadingIcon from "../svg/icons/loading/loading";
import defaultSticker from '@/app/svg/DALL·E 2025-01-25 09.14.55 - A colorful round sticker with a modern design, featuring a vibrant gradient background (blue, purple, and pink). The sticker should have a subtle shad.webp';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


type params = {
    exist: boolean,
    setExist: (value: boolean) => void
    allDiscounts: discountParams[],
    setAllDiscounts: (value: discountParams[]) => void
}
const AddDiscountSection = ({exist, setExist, allDiscounts, setAllDiscounts}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const currencyType = useContext(CompanyInformationContext)?.currencyType;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [isChangeHappen, setIsChangeHappen] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingWholePage = useContext(LoadingIconContext)?.setExist;
    const [newDiscount, setNewDiscount] = useState<discountParams | undefined>(undefined);
    const inputDateRef = useRef(null);
    
    
    const handleOldPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedDiscount = {
            ...newDiscount,
            oldPrice: Number(e.target.value),
            percentage: Math.floor(((newDiscount?.newPrice?? 0) / Number(e.target.value)) * 100) || 0
        };
    
        setNewDiscount(updatedDiscount);
        setIsChangeHappen(true);
    }
    const handlePercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const percentage = Number(e.target.value);
        const updatedDiscount = {
            ...newDiscount,
            percentage: percentage,
            newPrice: Number(((newDiscount?.oldPrice?? 0) * (1 - percentage / 100)).toFixed(2))
        };
    
        setNewDiscount(updatedDiscount);
        setIsChangeHappen(true);
    }
    const handleNewPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedDiscount = {
            ...newDiscount,
            newPrice: Number(e.target.value),
            percentage: Number((100 - (Number(e.target.value) / newDiscount.oldPrice) * 100).toFixed(2))
        };

        setNewDiscount(updatedDiscount);
        setIsChangeHappen(true);
    }
    const handleDateOfStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('hi');

        if (e.target.value) {
            const updatedDiscount = ({
                ...newDiscount,
                startOfDiscount: new Date(e.target.value)
            })
            setNewDiscount(updatedDiscount);
            setIsChangeHappen(true);
            
        }
    }
    const handleDateOfEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            const updatedDiscount = ({
                ...newDiscount,
                endOfDiscount: new Date(e.target.value)
            })
            setNewDiscount(updatedDiscount);
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
                        setNewDiscount({
                            ...newDiscount,
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
    const handleStickerClick = async(e: React.MouseEvent<HTMLImageElement>, discount: discountParams) => {
        if (inputDateRef.current) {            
            inputDateRef.current.click();
        }
    }
    
    useEffect(() => {
        if (newDiscount?.oldPrice && newDiscount?.percentage && newDiscount?.newPrice && newDiscount?.startOfDiscount && newDiscount?.endOfDiscount) {
            setIsDone(true);
        } else {
            setIsDone(false)
        }
        
    }, [newDiscount])

    const handleDone = async() => {
        if (isDone && setBanner) {
            setLoadingWholePage(true)
            const updatedDiscount = await addDiscount(newDiscount);   
            if (updatedDiscount) {
                setAllDiscounts([...allDiscounts, updatedDiscount]);
                setExist(false);
                setBanner(true,activeLanguage.discountUpdatedP, 'success');
            } else {
                setBanner(true,activeLanguage.unknowErrorP, 'fail');
            }

            setLoadingWholePage(false)
        }
    }

    useEffect(() => {
        console.log(newDiscount);
        
    }, [newDiscount])
    return (
        <div className={exist? "add-discount-card-container" : 'invisible'}>
            <div className="cart add-discount-card" >
                <div className="fa-x" >
                    <FontAwesomeIcon icon={faX} onClick={() => setExist(false)}/>
                </div>

                <h4 className="new-discountW">{activeLanguage?.newDiscountW}</h4>

                <div className="item">
                    <h4>{activeLanguage?.oldPriceW}: </h4> 
                    <input type="number" placeholder="..." value={newDiscount?.oldPrice != null ? newDiscount?.oldPrice : '...'} onChange={(e) => handleOldPrice(e)} />
                    <span>{currencyType}</span>
                </div>
                <div className="item">
                    <h4>{activeLanguage?.percentageW}:</h4> 
                    <input type="number" placeholder="..." value={newDiscount?.percentage != null ? newDiscount?.percentage : '...'}  onChange={(e) => handlePercentage(e)}/>% 
                </div>
                <div className="item">
                    <h4>{activeLanguage?.newPriceW}:</h4> 
                    <input type="number" placeholder="..." value={newDiscount?.newPrice != null ? newDiscount?.newPrice : '...'}  onChange={(e) => handleNewPrice(e)}/>
                    <span>{currencyType}</span>
                </div>
                <div className="item date">
                    <h4>{activeLanguage?.dateOfStartW}: </h4>  
                    <input
                        type="datetime-local"
                        onChange={(e) => handleDateOfStart(e)}
                    /> 
                </div>                        
                <div className=" item date">
                    <h4>{activeLanguage?.dateOfEndW}: </h4>  
                    <input
                        type="datetime-local"
                        onChange={(e) => handleDateOfEnd(e)}
                    />
                </div>
                <div className="item">
                    <h4>{activeLanguage?.StickerW}:</h4> 
                    <input type="file" ref={inputDateRef} className="file" onChange={(e) => handleImageSticker(e, newDiscount)}/>
                    <img className="sticker-img" src={newDiscount?.discountSticker ? newDiscount?.discountSticker : defaultSticker.src } onClick={(e) => handleStickerClick(e, newDiscount)} />
                    {loading && <LoadingIcon/>}
                </div>

                <h4 className={isDone ? "save-btn" : "save-btn-not-work"} onClick={handleDone}>{activeLanguage.saveW}</h4>
            </div>

        </div>
    )
}
export default AddDiscountSection;