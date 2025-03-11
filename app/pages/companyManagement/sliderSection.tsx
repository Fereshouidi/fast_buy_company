"use client";

import Card from "@/app/components/productsCard/card";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { sliderDataParams } from "@/app/contexts/slider";
import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import AddProductToSlider from "./addProductToSlider";


type Params = {
    exist: boolean
    setExist: (value: boolean) => void
    slider: sliderDataParams
    setSlider: (value: sliderDataParams) => void
}
const SliderSection = ({exist, setExist, slider, setSlider}: Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [productsSelected, setProductsSelected] = useState<productParams[]>([]);
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [updatedSlider, setUpdatedSlider] = useState<sliderDataParams>(slider);
    const [addProductToSliderSectionExist, setAddProductToSliderSectionExist] = useState<boolean>(false);
    

    useEffect(() => {
        setUpdatedSlider(slider)
    }, [slider])

    useEffect(() => {
        if (slider != updatedSlider) {
            setChangeHappen(true);
        }
    }, [updatedSlider])
    

    const handleExit = () => {
        setExist(false);
        setUpdatedSlider(slider);
        setChangeHappen(false);
    }

    function hexToRGBA(hex, alpha = 0.5) {
        hex = hex.replace(/^#/, '');
    
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
    
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const handleTittle = (e: React.ChangeEvent<HTMLInputElement>, language: 'eng' | 'ar') => {

        if (language == 'ar') {

            setUpdatedSlider({
                ...updatedSlider,
                tittle: {
                    english: updatedSlider?.tittle?.english,
                    arabic: e.target?.value
                }
            }) 

        } else {

            setUpdatedSlider({
                ...updatedSlider,
                tittle: {
                    english: e.target?.value,
                    arabic: updatedSlider?.tittle?.arabic
                }
            })

        }

    }

    const handleChangingTime = (e: React.ChangeEvent<HTMLInputElement>) => {

        setUpdatedSlider({
            ...updatedSlider,
            changingTime: Number(e.target?.value)
        }) 

    }

    const HandleDeleteBtn = () => {

        setUpdatedSlider({
            ...updatedSlider,
            products: updatedSlider.products?.filter((product) => 
                !productsSelected?.some(p => p._id === product._id)
            )
        });
        
        setProductsSelected([]);

    }

    const handleDoneClicked = (e: React.MouseEvent<HTMLElement>) => {

        if (changeHappen) {

            setSlider(updatedSlider)
            setChangeHappen(false);
            setExist(false);

        }

    }

    const handleProductClicked = (e: React.MouseEvent<HTMLElement>, product: productParams) => {
        e.stopPropagation();
        
        setProductsSelected(prev => {
            const isAlreadySelected = prev.some(p => p._id === product._id);
            
            if (isAlreadySelected) {
                return prev.filter(p => p._id !== product._id);
            } else {
                return [...prev, product];
            }
        });

        setChangeHappen(true);

    };

    useEffect(() => {
        console.log(updatedSlider);
        
    }, [updatedSlider])

    return (
        <div className={exist ? 'slider-container-section' : 'invisible'} onClick={handleExit}>

            <div id="slider-section" onClick={(e) => e.stopPropagation()}>

                <header className="header"> 
                    <div className="handling">
                        <div className="handling-item" onClick={() => setAddProductToSliderSectionExist(true)}>
                            {activeLanguage?.addW}
                                <FontAwesomeIcon 
                                icon={faPlus} 
                                className="add-icon"
                            />
                        </div>
                        <div className="handling-item" 
                            style={{
                                backgroundColor: productsSelected?.length > 0 ? 'red' : '',
                                color: productsSelected?.length > 0 ? 'white' : ''
                            }}
                            onClick={HandleDeleteBtn}
                        >
                            {activeLanguage?.deleteW}
                                <FontAwesomeIcon 
                                icon={faTrash} 
                                className="delete-icon"
                            />
                        </div>
                        <div className="handling-item" 
                            style={{
                                backgroundColor: changeHappen? 'green' : '',
                                color: changeHappen? 'white' : ''
                            }}
                            onClick={(e) => handleDoneClicked(e)}
                        >
                            {activeLanguage?.doneW}
                                <FontAwesomeIcon 
                                icon={faCheck} 
                                className="done-icon"
                            />
                        </div>
             
                    </div>

                    <h4>{activeLanguage?.sliderW}</h4>

                    <div className="cancel_" onClick={handleExit}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>
                
                <section id="slider-management-section" className="scroll">

                    <div className="params">

                        <div className="tittle-div container_">
                            <h4>{activeLanguage?.tittleW}</h4>
                            <input type="text" 
                                className="input-tittle"
                                placeholder="little ..."
                                defaultValue={updatedSlider?.tittle?.english}
                                onChange={(e) => handleTittle(e, 'eng')}
                            />
                            <input type="text"
                                className="input-tittle"
                                placeholder="العنوان ..."
                                defaultValue={updatedSlider?.tittle?.arabic}
                                onChange={(e) => handleTittle(e, 'ar')}
                            />
                        </div>

                        <div className="change-time-div container_">
                            <h4>{activeLanguage?.scrollsEvery}</h4>
                            <input type="number" 
                                className="input-seconds-num"
                                placeholder= '0'
                                defaultValue={updatedSlider?.changingTime}
                                onChange={(e) => handleChangingTime(e)}
                            />
                            <h4>{activeLanguage?.time?.secondW}</h4>
                        </div>

                    </div>

                    <h4 className="tittle">{activeLanguage?.productsW} : </h4>

                    {updatedSlider?.products.length > 0 ? 
                        updatedSlider?.products?.map((product) => {
                            return <div
                                key={product._id}
                                className="product-card" 
                                onClick={(e) => handleProductClicked(e, product)}
                            >
                                <Card 
                                    style={{
                                        backgroundColor: productsSelected?.some(p => p._id === product._id) 
                                        ? hexToRGBA(primaryColor, 0.2) 
                                        : ''
                                    }}
                                    product={product}/>
                            </div>
                        })

                    : <p>{'activeLanguage?.noProduct'}</p>
                
                    }

                </section>
                
            </div>

            <AddProductToSlider exist={addProductToSliderSectionExist} setExist={setAddProductToSliderSectionExist} updatedSlider={updatedSlider} setUpdatedSlider={setUpdatedSlider}/>
            
        </div>
    )
}
export default SliderSection;