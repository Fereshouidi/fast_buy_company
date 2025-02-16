'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { AdminDataParam } from "@/app/contexts/adminData";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { CustomerDataParams } from "@/app/contexts/customerData";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { deleteManyAdmin, deleteManyCustomer, deleteManyDeliveryBoys } from "@/app/crud";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    allCustomer: CustomerDataParams[]
    setAllCustomer: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    customerDataHasChanged: CustomerDataParams[]
    setCustomerDataHasChanged: React.Dispatch<React.SetStateAction<CustomerDataParams[]>>;
    customersSelected: CustomerDataParams[]
    setCustomersSelected: React.Dispatch<React.SetStateAction<CustomerDataParams[]>>
}

const MakeSure = ({exist, setExist, allCustomer, setAllCustomer, customerDataHasChanged, setCustomerDataHasChanged, customersSelected, setCustomersSelected}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;

    const deleteCustomerSelect = async () => {

        setLoadingIcon(true);

        const done = await deleteManyCustomer(customersSelected);
        if (done) {
            setAllCustomer(allCustomer?.filter(customer => {return !customersSelected?.includes(customer)}));
            setBanner(true, `${customersSelected.length} ${activeLanguage?.customersDeletedSuccess}`, 'success');
            setCustomersSelected([]);
        } else {
            setBanner(true, activeLanguage?.someErrorHappen, 'fail');
        }
        setLoadingIcon(false);
        setExist(false)    

    }

    return (
        <div className={exist? 'make-sure-section' : 'invisible'}>
            <div className="form">
                <FontAwesomeIcon className="cancel" icon={faX} onClick={() => setExist(false)}/>
                <p>{`${activeLanguage?.makeSureRemoveCustomerP?.part1} [${customersSelected?.map(admin => {return admin.userName})}] ${activeLanguage?.makeSureRemoveCustomerP?.part2}`}</p>
                <div className="handling">
                    <h4 className="no" onClick={() => setExist(false)}>{activeLanguage?.noW}</h4>
                    <h4 className="yes" onClick={deleteCustomerSelect}>{activeLanguage?.yesW}</h4>
                </div>
            </div>
        </div>
    )
}
export default MakeSure;