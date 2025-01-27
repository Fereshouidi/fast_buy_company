'use client';

import { productParams } from "@/app/contexts/productSelectForShowing";
import { deleteProductById, getCategorieById, getDiscountById, uploadImage } from "@/app/crud";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { updateProduct } from "@/app/crud";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import LoadingIcon_theHolePage from "@/app/svg/icons/loading/loadingHoleOfThePage";
import { BannerContext } from "@/app/contexts/bannerForEverything";

type params = {
    imagesEditSectionExist: boolean,
    setImagesEditSectionExist: (value: boolean) => void,
    productDetails: productParams | undefined, 
    setProductDetails: (value: productParams) => void;
    allProducts: productParams[],
    setAllProducts: (value: productParams[]) => void;
}
const EditSection = ({productDetails, setProductDetails, allProducts, setAllProducts, imagesEditSectionExist, setImagesEditSectionExist}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [imagePrincipal, setImagePrincipal] = useState<string | undefined>(productDetails?.imagePrincipal);
    const [isCategorieInputExist, setIsCategorieInputExist] = useState<boolean>(true);
    const [isDiscountInputExist, setIsDiscountInputExist] = useState<boolean>(true);
    const [loadingImagePrincipal, setLoadingImagePrincipal] = useState<boolean>(false);
    const [loadingCommit, setLoadingICommit] = useState<boolean>(false);
    const setBanner = useContext(BannerContext)?.setBanner;

    
    const imagePrincipalRef = useRef(null);

    const handleName = (e: React.ChangeEvent<HTMLInputElement>, language: 'english'| 'arabic') => {
        if (e.target) {
            if (language === 'english') {
                setProductDetails({
                    ...productDetails,
                    name: {english: e.target.value, arabic: productDetails.name?.arabic ?? ''}
                })
            }else {
                setProductDetails({
                    ...productDetails,
                    name: {arabic: e.target.value, english: productDetails.name?.english?? ''?? ''}
                })
            }

        }
        
    }
    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setProductDetails({
                ...productDetails,
                price: Number(e.target.value)
            })

        }
    }
    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setProductDetails({
                ...productDetails,
                quantity: Number(e.target.value)
            })
        }
    }
    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setProductDetails({
                ...productDetails,
                color: e.target.value
            })
        }
    }
    const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setProductDetails({
                ...productDetails,
                size: e.target.value
            })

        }
    }
    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>, language: 'english'| 'arabic') => {
        if (e.target) {
            if (language === 'english') {
                setProductDetails({
                    ...productDetails,
                    description: {english: e.target.value, arabic: productDetails.description?.arabic?? ''}
                })
            }else {
                setProductDetails({
                    ...productDetails,
                    description: {arabic: e.target.value, english: productDetails.description?.english?? ''}
                })
            }

        }
        
    }
    const handleImagePrincipal = async (e: React.ChangeEvent<HTMLInputElement>) => {

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
                    setLoadingImagePrincipal(true);
                    const uploadedImageUrl = await uploadImage(result);
                    if (uploadedImageUrl) {
                        setProductDetails({
                            ...productDetails,
                            imagePrincipal: uploadedImageUrl
                        })
                        setLoadingImagePrincipal(false)
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
    };
    const handleImages = () => {
        setImagesEditSectionExist(true);
    }
    const handleCategorie = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            console.log(e.target.value);
            
            const categorie = await getCategorieById(e.target.value);
            if (categorie) {
                setProductDetails({
                    ...productDetails,
                    categorie: categorie
                });
                setIsCategorieInputExist(true);
            } else {
                setIsCategorieInputExist(false);
            }

        }
    }
    const handleDiscount = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            console.log(e.target.value);
            
            const discount = await getDiscountById(e.target.value);
            if (discount || !e.target.value) {
                console.log(discount);
                
                setProductDetails({
                    ...productDetails,
                    discount: discount
                });
                setIsDiscountInputExist(true);
            } else {
                setIsDiscountInputExist(false);
            }

        }
    }
    const handleDelete = async(e: React.MouseEvent<HTMLSpanElement>) => {
        setLoadingICommit(true);
        const done = await deleteProductById(productDetails?._id);
        if (done) {
            const updatedAllProducts = allProducts.filter(product => product._id !== productDetails._id);
            setAllProducts(updatedAllProducts);
            setProductDetails(undefined);
            setBanner(true, activeLanguage.productDeletedSuccessfullyP, 'success' );
        } else {
            setBanner(true, activeLanguage.someErrorHappen, 'fail' );
        }
        setLoadingICommit(false);
    }
    

    const handleCommit = async() => {
        setLoadingICommit(true);
        const updatedProduct = await updateProduct(productDetails);
        if (updatedProduct) {
            const updatedAllProducts = allProducts.map((product) => 
                product._id === updatedProduct._id ? updatedProduct : product
            );
            setAllProducts(updatedAllProducts);
            setBanner(true, activeLanguage.productUpdatedSuccessfullyP, 'success' );
        }
        setLoadingICommit(false);
    }

    useEffect(() => {
        console.log(productDetails);
    }, [productDetails])

    return (
        
        <div id='edit-section'>

        <div id='name' className='item'>
            <h4>{activeLanguage?.nameW}</h4>
            <input type="text" maxLength={50} defaultValue={productDetails?.name?.english?? ''} onChange={(e) => handleName(e, 'english')}/>
            <input type="text" maxLength={50} defaultValue={productDetails?.name?.arabic ?? ''} onChange={(e) => handleName(e, 'arabic')}/>
        </div>

        <div id='price' className='item'>
            <h4>{activeLanguage?.priceW}</h4>
            <input type="number" defaultValue={productDetails?.price} onChange={(e) => handlePrice(e)}/>
        </div>

        <div id='quantity' className='item'>
            <h4>{activeLanguage?.quantityW}</h4>
            <input type="number" placeholder="quantity..." defaultValue={productDetails?.quantity} onChange={(e) => handleQuantity(e)}/>
        </div>

        <div id='description' className='item description-item'>
            <h4>{activeLanguage?.descriptionW}</h4>
            <textarea maxLength={500} defaultValue={productDetails?.description?.english?? ''} onChange={(e) => handleDescription(e, 'english')}/>
            <textarea maxLength={500} defaultValue={productDetails?.description?.arabic?? ''} onChange={(e) => handleDescription(e, 'arabic')}/>
        </div>

        <div id='color' className='item'>
            <h4>{activeLanguage?.colorW}</h4>
            <input type="text" maxLength={20} placeholder="color..." defaultValue={productDetails?.color?? ''} onChange={(e) => handleColor(e)}/>
            <p><strong>{activeLanguage?.remarqueW}:</strong>{activeLanguage?.remarqueP}</p>
        </div>

        <div id='image-principal' className='item'>
            <h4>{activeLanguage?.imagePrincipalW}</h4>
            <input type="file" className="file" ref={imagePrincipalRef} onChange={(e) => handleImagePrincipal(e)}/>
            <div className="images-container">
                <img src={productDetails?.imagePrincipal} alt="" onClick={() => imagePrincipalRef.current.click()}/>
                {loadingImagePrincipal && <LoadingIcon className={'LoadingIcon'}/>}
            </div>
        </div>

        <div id='images' className='item' onClick={handleImages}>
            <h4>{activeLanguage?.imagesW}</h4>
            <input type="file" className="file" />
            <div className="images-container">
                {productDetails?.images.slice(0, 8).map((image, index) => {
                    return <img key={index} src={image} alt="" />
                })}
            </div>
        </div>

        <div id='categorie' className='item'>
            <h4>{activeLanguage?.categorieID}</h4>
            <input type="text" placeholder="ID..." defaultValue={productDetails?.categorie?._id} onChange={(e) => handleCategorie(e)}/>
            {!isCategorieInputExist && <p>{activeLanguage?.categorieNotExistP}</p>}
        </div>

        <div id='discount-code' className='item'>
            <h4>{activeLanguage?.discountCodeId}</h4>
            <input type="text"placeholder="ID..." defaultValue={productDetails?.discountCode?._id?? ''}/>
        </div>

        <div id='discount' className='item'>
            <h4>{activeLanguage?.discountId}</h4>
            <input type="text" placeholder="ID..." defaultValue={productDetails?.discount?._id?? ''} onChange={handleDiscount}/>
            {!isDiscountInputExist && <p>{activeLanguage?.discountW}</p>}
        </div>

        <div id='size' className='item'>
            <h4>{activeLanguage?.sizeW}</h4>
            <input type="text" maxLength={20} placeholder="size..." defaultValue={productDetails?.size?? ''} onChange={(e) => handleSize(e)}/>
        </div>

        <div id='delete' className='item' >
            <h4>{activeLanguage?.deleteW}</h4>
            <span id="remove-product" onClick={handleDelete}>{activeLanguage?.removeProductW}</span>
        </div>


        <div id="commit-btn" onClick={handleCommit}>{activeLanguage?.commitChange}</div>
        <LoadingIcon className={loadingCommit? "loading-commit-click": ''} />


    </div>

    )
}
export default EditSection;