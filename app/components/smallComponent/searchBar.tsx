"use client";
import SearchIcon from "@/app/svg/icons/search";
import React, { CSSProperties, useState, useContext, useRef } from 'react';
import { getProductsByName } from "@/app/crud";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import english from '@/app/languages/english.json';

type params = {
    searchQuery: string | undefined,
    setSearchQuery: (value: string) => void
    discountsSectionExist: boolean,
    setDiscountsSection: (value: boolean) => void
    isAddProductSectionExist: boolean,
    setIsAddProductSectionExist: (value: boolean) => void
    setDiscountCodeSectionExist: (value: boolean) => void
}

const SearchBar = ({ searchQuery, setSearchQuery, discountsSectionExist, setDiscountsSection, isAddProductSectionExist, setIsAddProductSectionExist, setDiscountCodeSectionExist}: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const [focus, setFocus] = useState(false);
    const [itemFocus, setItemFocus] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchReasult, setSearchResult] = useState<productParams[] | undefined>(undefined)

    

    const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
            const searchQuery = event.target.value; 
            setSearchQuery(searchQuery);
            const products = await getProductsByName(searchQuery);
            setSearchResult(products);
            setSearchQuery(event.target.value);
    }


    const styleBar:CSSProperties = {
        width: '100vw',
        height: 'var(--header-height)',
        backgroundColor: 'var(--white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        zIndex: 980,
    }
    const style:CSSProperties = {
        backgroundColor: 'transparent',
        width: '50%',
        height: 'var(--primary-height)',
        position: 'relative',
        padding: '0',
        direction: activeLanguage.language == "arabic"? 'rtl': 'ltr',
        transition: '0.7s ease',
        zIndex: 999
    }
    const inputStyle:CSSProperties = {
        backgroundColor: 'var(--almost-white)',
        color: 'var(--black)',
        width: '100%',
        height: '100%',
        padding: '0 20px',
        boxSizing: 'border-box',
    }
    const inputStyleOnFocus:CSSProperties = {
        ...inputStyle,
        outline: 'none',
    }

    return(

        <div style={styleBar}>

            <div id="handling-section">

                <div id="open-discouts-section-btn" className="handling" onClick={() => setDiscountsSection(true)}>
                    <FontAwesomeIcon icon={faTag}/>
                    <h4>{activeLanguage?.discountW}</h4>
                </div>

                <div id="add-product" className="handling" onClick={()=> setIsAddProductSectionExist(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                    <h4>{activeLanguage?.addProductW}</h4>
                </div>

            </div>

            <div style={style} > 
                <input 
                    type="text" 
                    placeholder={
                        searchQuery? searchQuery : activeLanguage?.searchWord +' ...'
                    }
                    defaultValue={searchQuery?? ''}
                    ref={inputRef}
                    onChange={(e) => handleChange(e)}
                    className="primary-border" 
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    style={
                        focus?
                        inputStyleOnFocus
                        : inputStyle
                    } 
                />
                <div>
                    <SearchIcon/>
                </div>

            </div>

            <div id="open-discoutsCode-section-btn" className="handling" onClick={() => setDiscountCodeSectionExist(true)}>
                <FontAwesomeIcon icon={faTag}/>
                <h4>{activeLanguage?.discountCodeW}</h4>
            </div>

        </div>
    )



}
export default  SearchBar;

