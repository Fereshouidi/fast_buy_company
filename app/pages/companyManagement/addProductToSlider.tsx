"use client";

import Card from "@/app/components/productsCard/card";
import SearchBar_ from "@/app/components/smallComponent/searchBar_";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { sliderDataParams } from "@/app/contexts/slider";
import { getAllProducts, getAllProducts_SortedByRating } from "@/app/crud";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    updatedSlider: sliderDataParams
    setUpdatedSlider: (value: sliderDataParams) => void
}
const AddProductToSlider = ({exist, setExist, updatedSlider, setUpdatedSlider}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchReasult, setSearchResult] = useState<productParams[] | undefined>(undefined)
    // const [allProduct, setAllProduct] = useState<productParams[]>([]);
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [productsSelected, setProductsSelected] = useState<productParams[]>(updatedSlider?.products?? [])

    useEffect(() => {
        setProductsSelected(updatedSlider?.products);
        console.log(productsSelected);
        
    }, [updatedSlider])

    useEffect(() => {
        const fetchData = async () => {
            const products = await getAllProducts();
            setSearchResult(products)
        }
        fetchData()
    }, [])

    
    function hexToRGBA(hex, alpha = 0.5) {
        hex = hex.replace(/^#/, '');
    
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
    
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const handleExist = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setExist(false);
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
    
    const handleDoneClicked = (e: React.MouseEvent<HTMLElement>) => {

        if (changeHappen) {
            setUpdatedSlider({
                ...updatedSlider,
                products: productsSelected
            })

            setChangeHappen(false);
            setProductsSelected([])

        }

    }

    return (
        <div className={exist ? 'add-product-to-slider-section-container' : 'invisible'} onClick={(e) => handleExist(e)}>

            <header className="header">

                <div className="handling-item" 
                    style={{
                        backgroundColor: changeHappen? 'green' : '',
                        color: changeHappen? 'white' : ''
                    }}
                    onClick={(e) => handleDoneClicked(e)}
                >
                    {activeLanguage?.addW}
                        <FontAwesomeIcon 
                        icon={faCheck} 
                        className="done-icon"
                    />
                </div>

                <SearchBar_ 
                    className="search-bar"
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    classNameForContainer="search-bar-container" 
                    searchReasult={searchReasult}
                    setSearchResult={setSearchResult}
                />

                <FontAwesomeIcon icon={faX}/>

            </header>

            <section className="products-management">

                    {searchReasult?.length > 0 ? 
                        searchReasult.map((product) => {
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
    )
}
export default AddProductToSlider;