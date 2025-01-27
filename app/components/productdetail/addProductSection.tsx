'use client';

import { productParams } from "@/app/contexts/productSelectForShowing";
import { getCategorieById, getDiscountById, uploadImage } from "@/app/crud";
import { faImage, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { updateProduct, addProduct } from "@/app/crud";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import LoadingIcon_theHolePage from "@/app/svg/icons/loading/loadingHoleOfThePage";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import ImagesEdit from "./imagesEdit";
import ashenPicture from '@/app/svg/ash-to-ash-free-solidcolor-background.jpg';

type params = {
    exist: boolean,
    setExist: (value: boolean) => void
    allProducts: productParams[],
    setAllProducts: (value: productParams[]) => void;
}
const AddProductSection = ({exist, setExist, allProducts, setAllProducts}: params) => {


    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [newProduct, setNewProduct] = useState<productParams | undefined>(undefined);
    const [imagePrincipal, setImagePrincipal] = useState<string | undefined>(undefined);
    const [imagesEditSectionExist ,setImagesEditSectionExist] = useState<boolean>(false);
    const [isCategorieInputExist, setIsCategorieInputExist] = useState<boolean>(true);
    const [isDiscountInputExist, setIsDiscountInputExist] = useState<boolean>(true);
    const [loadingImagePrincipal, setLoadingImagePrincipal] = useState<boolean>(false);
    const [loadingCommit, setLoadingICommit] = useState<boolean>(false);
    const setBanner = useContext(BannerContext)?.setBanner;
    const imagePrincipalRef = useRef(null);

    useEffect(() => {
        setNewProduct({
            
            name: {english: '', arabic: ''},
            price: 0,
            quantity: 0,
            description: {english: '', arabic: ''},
            color: '',
            imagePrincipal: '',
            images: [],
            size: '',
            discount: undefined,
            categorie: undefined ,
            discountCode:  undefined,

        })
    }, [])

    const handleName = (e: React.ChangeEvent<HTMLInputElement>, language: 'english'| 'arabic') => {
        if (e.target) {
            if (language === 'english') {
                setNewProduct({
                    ...newProduct,
                    name: {english: e.target.value, arabic: newProduct.name?.arabic ?? ''}
                })
            }else {
                setNewProduct({
                    ...newProduct,
                    name: {arabic: e.target.value, english: newProduct?.name?.english?? ''}
                })
            }

        }
        
    }
    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewProduct({
                ...newProduct,
                price: Number(e.target.value)
            })

        }
    }
    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewProduct({
                ...newProduct,
                quantity: Number(e.target.value)
            })
        }
    }
    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewProduct({
                ...newProduct,
                color: e.target.value
            })
        }
    }
    const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewProduct({
                ...newProduct,
                size: e.target.value
            })

        }
    }
    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>, language: 'english'| 'arabic') => {
        if (e.target) {
            if (language === 'english') {
                setNewProduct({
                    ...newProduct,
                    description: {english: e.target.value, arabic: newProduct.description?.arabic?? ''}
                })
            }else {
                setNewProduct({
                    ...newProduct,
                    description: {arabic: e.target.value, english: newProduct.description?.english?? ''}
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
                        setNewProduct({
                            ...newProduct,
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
        console.log(imagesEditSectionExist);
        
    }
    const handleCategorie = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            console.log(e.target.value);
            
            const categorie = await getCategorieById(e.target.value);
            if (categorie) {
                setNewProduct({
                    ...newProduct,
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
                
                setNewProduct({
                    ...newProduct,
                    discount: discount
                });
                setIsDiscountInputExist(true);
            } else {
                setIsDiscountInputExist(false);
            }

        }
    }


    const handleCommit = async() => {
        setLoadingICommit(true);
        console.log(newProduct?? 'null1');
        
        const newProduct_ = await addProduct(newProduct);
        if (newProduct_) {
            const updatedAllProducts = allProducts.map((product) => 
                product._id === newProduct_._id ? newProduct_ : product
            );
            setAllProducts(updatedAllProducts);
            setBanner(true, activeLanguage.productAddedSuccessfullyP, 'success' );
        }
        setLoadingICommit(false);
    }

    useEffect(() => {
        console.log(newProduct);
    }, [newProduct])

    const style: CSSProperties = {
        display: exist? '' : 'none'
    }

    const styleFaX: CSSProperties = {
        position: 'absolute',
        top: '0',
        left: activeLanguage?.language == 'arabic' ? '0' : '',
        right: activeLanguage?.language == 'arabic' ? '' : '0',
        margin: 'var(--large-margin)'
    }
    
    return <div id="add-product-whole-section" style={style} >

        
                <div className="header">
                    <h4>{activeLanguage?.newProductW}</h4>
                    <FontAwesomeIcon className='faX' style={styleFaX} icon={faX} onClick={() => setExist(false)}/>
                </div>

                <div id='add-product-section' >

                <div id='name' className='item'>
                    <h4>{activeLanguage?.nameW}</h4>
                    <input type="text" minLength={50} placeholder="name ..." onChange={(e) => handleName(e, 'english')}/>
                    <input type="text" maxLength={50} placeholder="الاسم ..." onChange={(e) => handleName(e, 'arabic')}/>
                </div>

                <div id='price' className='item'>
                    <h4>{activeLanguage?.priceW}</h4>
                    <input type="number" placeholder={activeLanguage?.priceW + ' ...'} onChange={(e) => handlePrice(e)}/>
                </div>

                <div id='quantity' className='item'>
                    <h4>{activeLanguage?.quantityW}</h4>
                    <input type="number" placeholder={activeLanguage?.quantityW + " ..." } onChange={(e) => handleQuantity(e)}/>
                </div>

                <div id='description' className='item description-item'>
                    <h4>{activeLanguage?.descriptionW}</h4>
                    <textarea maxLength={500} placeholder='description ...' onChange={(e) => handleDescription(e, 'english')}/>
                    <textarea maxLength={500} placeholder='الوصف ...' onChange={(e) => handleDescription(e, 'arabic')}/>
                </div>

                <div id='color' className='item'>
                    <h4>{activeLanguage?.colorW}</h4>
                    <input type="text" maxLength={20} placeholder={activeLanguage?.colorW} onChange={(e) => handleColor(e)}/>
                    <p><strong>{activeLanguage?.remarqueW}:</strong>{activeLanguage?.remarqueP}</p>
                </div>

                <div id='image-principal' className='item' onClick={() => imagePrincipalRef.current.click()}>
                    <h4>{activeLanguage?.imagePrincipalW}</h4>
                    <input  type="file" className="file" ref={imagePrincipalRef} onChange={(e) => handleImagePrincipal(e)}/>
                    <div className="images-container">
                        {newProduct?.imagePrincipal? <img src={newProduct?.imagePrincipal} alt="" /> : <div className="no-image">{activeLanguage?.noImageP}</div> }
                        {loadingImagePrincipal && <LoadingIcon className={'LoadingIcon'}/>}
                    </div>
                </div>

                <div id='images' className='item' onClick={handleImages}>
                    <h4>{activeLanguage?.imagesW}</h4>
                    <input type="file" className="file" />
                    <div className="images-container">
                        {newProduct?.images.length > 0 ? newProduct?.images.slice(0, 8).map((image, index) => {
                            return image && <img key={index} src={image} alt="" />
                        }):
                            <div className="no-image">{activeLanguage?.noImagesP}</div>
                        }
                    </div>
                </div>

                <div id='categorie' className='item'>
                    <h4>{activeLanguage?.categorieID}</h4>
                    <input type="text" placeholder="ID..." onChange={(e) => handleCategorie(e)}/>
                    {!isCategorieInputExist && <p>{activeLanguage?.categorieNotExistP}</p>}
                </div>

                <div id='discount-code' className='item'>
                    <h4>{activeLanguage?.discountCodeId}</h4>
                    <input type="text"placeholder="ID..."/>
                </div>

                <div id='discount' className='item'>
                    <h4>{activeLanguage?.discountId}</h4>
                    <input type="text" placeholder="ID..." onChange={handleDiscount}/>
                    {!isDiscountInputExist && <p>{activeLanguage?.discountW}</p>}
                </div>

                <div id='size' className='item'>
                    <h4>{activeLanguage?.sizeW}</h4>
                    <input type="text" maxLength={20} placeholder={activeLanguage?.sizeW} onChange={(e) => handleSize(e)}/>
                </div>


                <div id="commit-btn" onClick={handleCommit}>{activeLanguage?.addProductW}</div>
                <LoadingIcon className={loadingCommit? "loading-commit-click": ''} />

               
                </div>
                <ImagesEdit exist={imagesEditSectionExist} setExist={setImagesEditSectionExist} productDetails={newProduct} setProductDetails={setNewProduct}/>

    </div>
}
export default AddProductSection;