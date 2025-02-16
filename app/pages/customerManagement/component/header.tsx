'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { useContext, useEffect, useRef } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { AdminDataParam } from "@/app/contexts/adminData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteManyAdmin, deleteManyDeliveryBoys, updateManyAdmins, updateManyCustomers, updateManyDeliveryBoys } from "@/app/crud";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { CustomerDataParams } from "@/app/contexts/customerData";

type params = {
    allCustomer: CustomerDataParams[]
    setAllCustomer: (value: CustomerDataParams[]) => void 
    customerDataHasChanged: CustomerDataParams[]
    setCustomerDataHasChanged: React.Dispatch<React.SetStateAction<CustomerDataParams[]>>;
    customersSelected: CustomerDataParams[]
    setCustomersSelected: React.Dispatch<React.SetStateAction<CustomerDataParams[]>>
    makeSureExist: boolean
    setMakeSureExist:(value: boolean) => void
}
const Header = ({allCustomer, setAllCustomer, customerDataHasChanged, setCustomerDataHasChanged, customersSelected, setCustomersSelected, makeSureExist, setMakeSureExist,}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const doneBTNRef = useRef<HTMLDivElement>();

    const updateCustomer = async () => {

        setLoadingIcon(true);

        if (customerDataHasChanged.length > 0) {

            if (doneBTNRef.current) {
                doneBTNRef.current.style.backgroundColor = 'var(--ashen)';
                setTimeout(() => {
                    doneBTNRef.current.style.backgroundColor = 'var(--ashen-semi-transparent)';
                }, 300)
            }
                const updatedCustomers = await updateManyCustomers(allCustomer);  
            if (updatedCustomers) {
                setAllCustomer(updatedCustomers);
                setBanner(true, activeLanguage?.customerUpdatedSuccessP, 'success')
                setCustomerDataHasChanged([]);
            } else {
                setBanner(true, activeLanguage?.someErrorHappen, 'fail')
            }    
        }

        
        setLoadingIcon(false);
    }
    const handleDelete = async () => {
        if (customersSelected?.length == 0) {
            return setBanner(true, activeLanguage?.selectCustomerP, 'fail');
        } else {
            setMakeSureExist(true)
        }
    }

    
    useEffect(() => {
        console.log(allCustomer);
        
    }, [allCustomer])
    
    return (
        <div className="header">

            <div className="left-side">

                <div className="statistics">
                    <div className={"item admins-num"}>
                        <h4>{activeLanguage?.customerW + 's ('}</h4>
                        <strong>{allCustomer?.length + ')'}</strong>
                    </div>
                </div>

            </div>

            <div className="mid-side">

                <div className="delete handling"  style={{backgroundColor: customersSelected?.length > 0 ? 'red' : '', color: customersSelected?.length > 0 ? 'white' : ''}} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}/>
                    {activeLanguage?.deleteW}
                </div>

                <div className="dane handling" style={{backgroundColor: customerDataHasChanged?.length > 0 ? 'green' : '', color: customerDataHasChanged?.length > 0 ? 'white' : ''}} ref={doneBTNRef} onClick={updateCustomer} >
                    <FontAwesomeIcon icon={faCheck}/>
                    {activeLanguage?.doneW}
                </div>
            </div>

            {/* <div className=" right-side">
                <div className="switch-sections">
                    <h4 style={{backgroundColor: activeSection == 'deleveryBoySection' ? primaryColor : ''}} onClick={() => setActiveSection('deleveryBoySection')}>{activeLanguage?.deleveryBoysW}</h4>
                    <h4 style={{backgroundColor: activeSection == 'adminSection' ? primaryColor : ''}} onClick={() => setActiveSection('adminSection')}>{activeLanguage?.adminsW}</h4>
                </div>
            </div> */}

        </div>
    )
}
export default Header;