'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { useContext, useEffect, useRef } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { AdminDataParam } from "@/app/contexts/adminData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteManyAdmin, deleteManyDeliveryBoys, updateManyAdmins, updateManyDeliveryBoys } from "@/app/crud";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";

type params = {
    activeSection: 'adminSection' | 'deleveryBoySection'
    setActiveSection: (value: 'adminSection' | 'deleveryBoySection') => void
    allAdmins: AdminDataParam[]
    setAllAdmins: (value: AdminDataParam[]) => void 
    allDeleveryBoys: AdminDataParam[];
    setAllDeleveryBoys: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    adminDataHasChanged: AdminDataParam[]
    setAdminDataHasChanged: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    deleveryBoyHasChanged: AdminDataParam[]
    setDeleveryBoyHasChanged: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    addAdminSectionExist: boolean
    setAddAdminSectionExist: (value: boolean) => void
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    deleveryBoySelected: AdminDataParam[]
    setDeleveryBoySelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    makeSureExist: boolean
    setMakeSureExist:(value: boolean) => void
}
const Header = ({activeSection, setActiveSection, allAdmins, setAllAdmins, adminDataHasChanged, setAdminDataHasChanged, deleveryBoyHasChanged, setDeleveryBoyHasChanged, setAddAdminSectionExist, adminSelected, setAdminSelected, deleveryBoySelected, setDeleveryBoySelected, makeSureExist, setMakeSureExist, allDeleveryBoys, setAllDeleveryBoys}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const doneBTNRef = useRef<HTMLDivElement>();

    const updateAdmin = async () => {

        setLoadingIcon(true);

        if (activeSection == 'adminSection') {

            if (adminDataHasChanged.length > 0) {

                if (doneBTNRef.current) {
                    doneBTNRef.current.style.backgroundColor = 'var(--ashen)';
                    setTimeout(() => {
                        doneBTNRef.current.style.backgroundColor = 'var(--ashen-semi-transparent)';
                    }, 300)
                }
                const updatedAdmins = await updateManyAdmins(allAdmins);  
                if (updatedAdmins) {
                    setAllAdmins(updatedAdmins);
                    setBanner(true, activeLanguage?.adminUpdatedSuccessP, 'success')
                    setAdminDataHasChanged([]);
                } else {
                    setBanner(true, activeLanguage?.someErrorHappen, 'fail')
                }    
            }

        } else if (activeSection == 'deleveryBoySection') {

            if (deleveryBoyHasChanged.length > 0) {

                if (doneBTNRef.current) {
                    doneBTNRef.current.style.backgroundColor = 'var(--ashen)';
                    setTimeout(() => {
                        doneBTNRef.current.style.backgroundColor = 'var(--ashen-semi-transparent)';
                    }, 300)
                }
                const updatedDeleveryBoys = await updateManyDeliveryBoys(allDeleveryBoys);  
                if (updatedDeleveryBoys) {
                    setAllDeleveryBoys(updatedDeleveryBoys);
                    setBanner(true, activeLanguage?.deliveryBoyUpdatedSuccessP, 'success')
                    setDeleveryBoyHasChanged([]);
                } else {
                    setBanner(true, activeLanguage?.someErrorHappen, 'fail')
                }    
            }

        }
        setLoadingIcon(false);
    }
    const handleDelete = async () => {
        if (activeSection == 'adminSection') {

            if (adminSelected?.length == 0) {
                return setBanner(true, activeLanguage?.selectAdminP, 'fail');
            } else {
                setMakeSureExist(true)
            }
        } else if (activeSection == 'deleveryBoySection') {

            if (deleveryBoySelected?.length == 0) {
                return setBanner(true, activeLanguage?.selectDeliveryBoyP, 'fail');
            } else {
                setMakeSureExist(true)
            }
        }
    }

    
    return (
        <div className="header">

            <div className="left-side">

                <div className="statistics">
                    <div className={activeSection == 'adminSection' ? "item admins-num" : 'invisible'}>
                        <h4>{activeLanguage?.adminsW + ' ('}</h4>
                        <strong>{allAdmins?.length + ')'}</strong>
                    </div>
                    <div className={activeSection == 'deleveryBoySection' ? "item delevery-boy-num" : 'invisible'}>
                        <h4>{activeLanguage?.deleveryBoysW + ' ('}</h4>
                        <strong>{allDeleveryBoys?.length + ')'}</strong>
                    </div>
                </div>

            </div>

            <div className="mid-side">
                {activeSection == 'adminSection' &&<div className="add handling" onClick={() => setAddAdminSectionExist(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                    {activeLanguage?.addW}
                </div>}

                <div className="delete handling"  style={{backgroundColor: adminSelected.length > 0 || deleveryBoySelected.length > 0 ? 'red' : '', color: adminSelected.length > 0 || deleveryBoySelected.length > 0? 'white' : ''}} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}/>
                    {activeLanguage?.deleteW}
                </div>

                <div className="dane handling" style={{backgroundColor: adminDataHasChanged.length > 0 || deleveryBoyHasChanged.length > 0 ? 'green' : '', color: adminDataHasChanged.length > 0 || deleveryBoyHasChanged.length > 0  ? 'white' : ''}} ref={doneBTNRef} onClick={updateAdmin} >
                    <FontAwesomeIcon icon={faCheck}/>
                    {activeLanguage?.doneW}
                </div>
            </div>

            <div className=" right-side">
                <div className="switch-sections">
                    <h4 style={{backgroundColor: activeSection == 'deleveryBoySection' ? primaryColor : ''}} onClick={() => setActiveSection('deleveryBoySection')}>{activeLanguage?.deleveryBoysW}</h4>
                    <h4 style={{backgroundColor: activeSection == 'adminSection' ? primaryColor : ''}} onClick={() => setActiveSection('adminSection')}>{activeLanguage?.adminsW}</h4>
                </div>
            </div>

        </div>
    )
}
export default Header;