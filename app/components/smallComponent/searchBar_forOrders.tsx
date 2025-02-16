'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { OrderParams } from "@/app/contexts/order";
import { productParams } from "@/app/contexts/productSelectForShowing";
import SearchIcon from "@/app/svg/icons/search";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { getOrdersByFilter, gtAllOrders, searchOrders } from "@/app/crud";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";


type params = {
    activeSection: 'processingSection' | 'failseSection' | 'successSection',
    allOrders: OrderParams
    setAllOrders: (value: OrderParams) => void
}
// type activeFilterParams = {
//     activeFilter: 
// }
const SearchBar_ForOrders = ({allOrders, setAllOrders, activeSection}) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const [focus, setFocus] = useState(false);
    const [itemFocus, setItemFocus] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchReasult, setSearchResult] = useState<productParams[] | undefined>(undefined);
    const [activeFilter, setActiveFilter] = useState<'all' | 'processing' | 'packaged' | 'Unassigned' | 'shipped'>('all');
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;

    const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        
        if (inputRef.current) {
            const result = await searchOrders(event.target?.value, activeFilter);
            console.log(result);
            setAllOrders(result?? []);
        } else {
            const orders = await gtAllOrders();
            if (activeFilter == 'processing') {
                const FilteredOrders = orders.filter(order => order.status == 'processing');
                setAllOrders(FilteredOrders);
            } else if (activeFilter == 'packaged') {
                const FilteredOrders = orders.filter(order => order.status == 'packaged');
                setAllOrders(FilteredOrders);
            } else if (activeFilter == 'Unassigned') {
                const FilteredOrders = orders.filter(order => !order.deliveryBoy);
                setAllOrders(FilteredOrders);
            } else if (activeFilter == 'shipped') {
                const FilteredOrders = orders.filter(order => order.status == 'shipped');
                setAllOrders(FilteredOrders);
            } else {
                setAllOrders(orders);
            }
        }
    }

    useEffect( () => {
        if (inputRef.current) {
            const fetchData = async () => {
                const filteredOrders = await searchOrders(inputRef.current?.value, activeFilter);
                console.log(inputRef.current?.value);
                if (filteredOrders) {
                    setAllOrders(filteredOrders);
                }
            }   
            fetchData();  
        }
   
    }, [activeFilter])

    const translateStatus = (status: string) => {

        let translatedStatus = '';

        switch (status) {
            case 'processing':
                translatedStatus = activeLanguage?.orderStatus.processingW?? '';
                break;
            case 'packaged':
                translatedStatus = activeLanguage?.orderStatus.packagedW?? '';
                break;
            case 'shipped':
                translatedStatus = activeLanguage?.orderStatus.shippedW?? '';
                break;
            case 'delivered':
                translatedStatus = activeLanguage?.orderStatus.deliveredW?? '';
                break;
            case 'canceled':
                translatedStatus = activeLanguage?.orderStatus.canceledW?? '';
                break;
            case 'failed':
                translatedStatus = activeLanguage?.orderStatus.failedW?? '';
                break;
            case 'Being returned':
                translatedStatus = activeLanguage?.orderStatus.BeingReturnedW?? '';
                break;
            case 'returned':
                translatedStatus = activeLanguage?.orderStatus.returnedW?? '';
                break;
            case 'unassigned':
                translatedStatus = activeLanguage?.orderStatus.unassignedW?? '';
                break;
        }

         return translatedStatus;
    }


    const style:CSSProperties = {
        backgroundColor: 'transparent',
        width: '50%',
        height: 'var(--primary-height)',
        position: 'relative',
        padding: '0',
        direction: activeLanguage.language == "arabic"? 'rtl': 'ltr',
        transition: '0.7s ease',
        zIndex: 950
    }
    const inputStyle:CSSProperties = {
        backgroundColor: 'var(--almost-white)',
        color: 'var(--black)',
        width: '100%',
        height: '100%',
        padding: '0 20px',
        boxSizing: 'border-box',
        outline: 'none',
        fontSize: 'var(--small-size)'
    }
    const inputStyleOnFocus:CSSProperties = {
        ...inputStyle,
        outline: 'none',
        fontSize: 'small'
    }
    const styleActiveFilter:CSSProperties = {
        backgroundColor: primaryColor,

    }
    
 
    return (
        <div style={style} > 
        <input 
            type="text" 
            placeholder={activeLanguage?.searchBy?.orders}
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

        {activeSection == 'processingSection' && <div className="handling-status-div">
            <h4 className="handling" style={activeFilter == 'all' ? styleActiveFilter : null} onClick={() => setActiveFilter('all')}>{activeLanguage?.allW}</h4>
            <h4 className="handling" style={activeFilter == 'processing' ? styleActiveFilter : null} onClick={() => setActiveFilter('processing')}>{translateStatus('processing')}</h4>
            <h4 className="handling" style={activeFilter == 'packaged' ? styleActiveFilter : null} onClick={() => setActiveFilter('packaged')}>{translateStatus('packaged')}</h4>
            <h4 className="handling" style={activeFilter == 'Unassigned' ? styleActiveFilter : null} onClick={() => setActiveFilter('Unassigned')}>{translateStatus('unassigned')}</h4>
            <h4 className="handling" style={activeFilter == 'shipped' ? styleActiveFilter : null} onClick={() => setActiveFilter('shipped')}>{translateStatus('shipped')}</h4>
        </div>}

    </div>
    )
}
export default SearchBar_ForOrders;