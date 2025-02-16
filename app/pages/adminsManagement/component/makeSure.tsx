'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { AdminDataParam } from "@/app/contexts/adminData";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { deleteManyAdmin, deleteManyDeliveryBoys } from "@/app/crud";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    activeSection: 'adminSection' | 'deleveryBoySection'
    setActiveSection: (value: 'adminSection' | 'deleveryBoySection') => void
    allAdmins: AdminDataParam[]
    setAllAdmins: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    deleveryBoySelected: deleveryBoyData[]
    setDeleveryBoySelected: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>
    allDeliveryBoys?: deleveryBoyData[] | undefined;
    setAllDeliveryBoys?: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>;
}

const MakeSure = ({exist, setExist, activeSection, setActiveSection, allAdmins, setAllAdmins, allDeliveryBoys, setAllDeliveryBoys, adminSelected, setAdminSelected, deleveryBoySelected, setDeleveryBoySelected}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;

    const deleteAdminsSelect = async () => {

        setLoadingIcon(true);

        if (activeSection == 'adminSection') {

            const done = await deleteManyAdmin(adminSelected);
            if (done) {
                setAllAdmins(allAdmins?.filter(admin => {return !adminSelected?.includes(admin)}));
                setBanner(true, `${adminSelected.length} ${activeLanguage?.adminsDeletedSuccess}`, 'success');
                setAdminSelected([]);
            } else {
                setBanner(true, activeLanguage?.someErrorHappen, 'fail');
            }
            setLoadingIcon(false);
            setExist(false)    

        } else if (activeSection == 'deleveryBoySection') {

            const done = await deleteManyDeliveryBoys(deleveryBoySelected);
            if (done) {
                setAllDeliveryBoys(allDeliveryBoys?.filter(deliveryBoy => {return !deleveryBoySelected?.includes(deliveryBoy)}));
                setBanner(true, `${deleveryBoySelected.length} ${activeLanguage?.deliveryBoyDeletedSuccess}`, 'success');
                setDeleveryBoySelected([]);
            } else {
                setBanner(true, activeLanguage?.someErrorHappen, 'fail');
            }
            setLoadingIcon(false);
            setExist(false)    
        }

    }

    return (
        <div className={exist? 'make-sure-section' : 'invisible'}>
            <div className="form">
                <FontAwesomeIcon className="cancel" icon={faX} onClick={() => setExist(false)}/>
                <p>{
                    activeSection == 'adminSection' ?
                        `${activeLanguage?.makeSureRemoveAdmin?.part1} [${adminSelected?.map(admin => {return admin.name})}] ${activeLanguage?.makeSureRemoveAdmin?.part2}`
                    :   `${activeLanguage?.makeSureRemoveDeliveryBoyP?.part1} [${deleveryBoySelected?.map(deliveryBoy => {return deliveryBoy.userName})}] ${activeLanguage?.makeSureRemoveDeliveryBoyP?.part2}`
                }</p>
                <div className="handling">
                    <h4 className="no" onClick={() => setExist(false)}>{activeLanguage?.noW}</h4>
                    <h4 className="yes" onClick={deleteAdminsSelect}>{activeLanguage?.yesW}</h4>
                </div>
            </div>
        </div>
    )
}
export default MakeSure;