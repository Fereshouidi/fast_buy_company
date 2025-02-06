'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { productParams } from "@/app/contexts/productSelectForShowing";
import SearchIcon from "@/app/svg/icons/search";
import { CSSProperties, useContext, useRef, useState } from "react";

type params = {
    searchQuery: string | undefined,
    setSearchQuery: (value: string) => void
}
const SearchBar_forAdmins = ({searchQuery, setSearchQuery, }) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const [focus, setFocus] = useState(false);
    const [itemFocus, setItemFocus] = useState<string | null>(null);
    // const [activeLanguage, setactiveLanguage] = useState(english);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchReasult, setSearchResult] = useState<productParams[] | undefined>(undefined)

    const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        // const searchQuery = event.target.value; 
        // setSearchQuery(searchQuery);
        // const products = await getProductsByName(searchQuery);
        // setSearchResult(products);
        // setSearchQuery(event.target.value);
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
 

    return (
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
    )
}