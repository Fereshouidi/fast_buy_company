'use client';

import { productParams } from "@/app/contexts/productSelectForShowing";
import { uploadImage } from "@/app/crud";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useContext, useRef, useState } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";

type paams = {
    exist: boolean,
    setExist: (value: boolean) => void
    productDetails: productParams ,
    setProductDetails: (value: productParams) => void
}
const ImagesEdit = ({exist, setExist, productDetails, setProductDetails}: paams) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext).primaryColor;
    const [loadingIcon, setLoadingIcon] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<string>('');
    const [isThereChange, setIsThereChange] = useState<boolean>(false);
    const inputFileRef = useRef(null);

    const handleAddClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click()
        }
    }
    const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
        const files = e.target.files;
        if (!files || files.length === 0) return;
    
        const validImages: string[] = [];
        const uploadPromises: Promise<string>[] = [];
    
        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                alert("The selected file is not an image!");
                continue;
            }
    
            const reader = new FileReader();
            const filePromise = new Promise<string>((resolve, reject) => {
                reader.onload = async (event) => {
                    try {
                        setLoadingIcon(true);
                        const result = event.target?.result;
                        if (typeof result === "string") {
                            validImages.push(result); // حفظ الصورة مؤقتًا
                            const uploadedImageUrl = await uploadImage(result);
                            resolve(uploadedImageUrl);
                        } else {
                            reject("The type of this picture is unsuitable!");
                        }
                    } catch (error) {
                        reject(error);
                    }
                };
            });
    
            reader.readAsDataURL(file);
            uploadPromises.push(filePromise);
        }
    
        try {
            const uploadedImageUrls = await Promise.all(uploadPromises);
    
            setProductDetails({
                ...productDetails,
                images: [...(productDetails.images || []), ...uploadedImageUrls], 
            });
            setIsThereChange(true);
            console.log("Uploaded Image URLs:", uploadedImageUrls);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
        setLoadingIcon(false);
    };
    const handleDeleteImage = async () => {
        if (activeImage) {

            setProductDetails({
                ...productDetails,
                images: productDetails.images.filter( image => {
                    return image !== activeImage
                }
            )})
            setActiveImage('');
            setIsThereChange(true);

        } else {

        }
    }
    const handleDone = async () => {
        setExist(false);
        setIsThereChange(false);
    }

    const styleActiveImage: CSSProperties = {
        border: `2px solid ${primaryColor}`
    }
    const styleTrash: CSSProperties = {
        backgroundColor: activeImage ? 'red': ''
    }
    const styleDone: CSSProperties = {
        backgroundColor: isThereChange ? 'green': ''
    }
    return (
        <div className={exist? "images-edit" : 'invisible'}>
            <div className="header">
                <div className="item add-picture" onClick={handleAddClick}>
                    <input type="file" multiple className="file" ref={inputFileRef} onChange={(e) => handleAddImage(e)}/>
                    <FontAwesomeIcon icon={faPlus}/>
                    <h4>{activeLanguage?.addPictureW}</h4>
                </div>
                <div className="item delete-picture" onClick={handleDeleteImage} style={styleTrash}>
                    <FontAwesomeIcon icon={faTrash}/>
                    <h4>{activeLanguage?.deleteW}</h4>
                </div>
                <div className="item done" onClick={handleDone} style={styleDone}>
                    <FontAwesomeIcon icon={faCheck}/>
                    <h4>{activeLanguage?.doneW}</h4>
                </div>
            </div>
            <section className="images-display">{
                productDetails?.images.length > 0 ? productDetails.images.map((image, index) => {
                    return <img style={activeImage == image ? styleActiveImage: null} key={index} src={image} onClick={() => setActiveImage(image)} /> 
                })
                : <div className="no-image" >{activeLanguage?.noImagesP}</div>
            }</section>

            {loadingIcon && <LoadingIcon className="Loading-icon"/>}
        </div>
    )
}
export default ImagesEdit;