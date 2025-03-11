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
    searchQuery?: string | undefined,
    setSearchQuery?: (value: string) => void
    classNameForContainer?: string
    styleForContainer?: CSSProperties
    className?: string
    style?: CSSProperties
    searchReasult: productParams[]
    setSearchResult: (value: productParams[]) => void
}

const SearchBar_ = ({searchQuery, setSearchQuery,classNameForContainer, styleForContainer, className, style, searchReasult, setSearchResult}: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    

    const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value; 
        setSearchQuery(searchQuery);
        const products = await getProductsByName(searchQuery);
        setSearchResult(products);
        setSearchQuery(event.target.value);
    }

    const handleClick = async(event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    }


    const styleBar:CSSProperties = {
        ...styleForContainer
        // width: '100vw',
        // height: 'var(--header-height)',
        // // backgroundColor: 'var(--white)',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'start',
        // zIndex: 980,
    }
    const style_:CSSProperties = {
        ...style,
        // backgroundColor: 'transparent',
        // width: '50%',
        // height: 'var(--primary-height)',
        // position: 'relative',
        // padding: '0',
        // direction: activeLanguage.language == "arabic"? 'rtl': 'ltr',
        // transition: '0.7s ease',
        // zIndex: 999
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

        <div style={styleBar} className={`${classNameForContainer}`} onClick={(e) => handleClick(e)}>

            <div style={style_} className={`${className}`} > 
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

        </div>
    )



}
export default  SearchBar_;

