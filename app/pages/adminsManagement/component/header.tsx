'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { useContext, useEffect, useRef } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { AdminDataParam } from "@/app/contexts/adminData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteManyAdmin, updateManyAdmins } from "@/app/crud";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";

type params = {
    activeSection: 'adminSection' | 'deleveryBoySection'
    setActiveSection: (value: 'adminSection' | 'deleveryBoySection') => void
    allAdmins: AdminDataParam[]
    setAllAdmins: (value: AdminDataParam[]) => void 
    adminDataHasChanged: AdminDataParam[]
    setAdminDataHasChanged: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    addAdminSectionExist: boolean
    setAddAdminSectionExist: (value: boolean) => void
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    makeSureExist: boolean
    setMakeSureExist:(value: boolean) => void
}
const Header = ({activeSection, setActiveSection, allAdmins, setAllAdmins, adminDataHasChanged, setAdminDataHasChanged, addAdminSectionExist, setAddAdminSectionExist, adminSelected, setAdminSelected, makeSureExist, setMakeSureExist}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const doneBTNRef = useRef<HTMLDivElement>();

    const updateAdmin = async () => {
        if (adminDataHasChanged.length > 0) {

            if (doneBTNRef.current) {
                doneBTNRef.current.style.backgroundColor = 'var(--ashen)';
                setTimeout(() => {
                    doneBTNRef.current.style.backgroundColor = 'var(--ashen-semi-transparent)';
                }, 300)
            }
            setLoadingIcon(true);
            const updatedAdmins = await updateManyAdmins(allAdmins);        
            setAllAdmins(updatedAdmins);
            setBanner(true, 'admin has been updated successfully', 'success')
            setLoadingIcon(false);
            setAdminDataHasChanged([]);
        }
    }
    const handleDelete = async () => {
        if (adminSelected?.length == 0) {
            return setBanner(true, activeLanguage?.selectAdminP, 'fail');
        } else {
            setMakeSureExist(true)
        }
    }

    
    useEffect(() => {
        console.log(allAdmins);
        
    }, [allAdmins])
    
    return (
        <div className="header">

            <div className="left-side">

                <div className="statistics">
                    <div className={activeSection == 'adminSection' ? "item admins-num" : 'invisible'}>
                        <h4>{activeLanguage?.adminsW + ' ('}</h4>
                        <strong>{allAdmins?.length + ')'}</strong>
                    </div>
                </div>

            </div>

            <div className="mid-side">
                <div className="add handling" onClick={() => setAddAdminSectionExist(true)}>
                    <FontAwesomeIcon icon={faPlus}/>
                    {activeLanguage?.addW}
                </div>

                <div className="delete handling"  style={{backgroundColor: adminSelected.length > 0 ? 'red' : '', color: adminSelected.length > 0 ? 'white' : ''}} onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash}/>
                    {activeLanguage?.deleteW}
                </div>

                <div className="dane handling" style={{backgroundColor: adminDataHasChanged.length > 0 ? 'green' : '', color: adminDataHasChanged.length > 0 ? 'white' : ''}} ref={doneBTNRef} onClick={updateAdmin} >
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