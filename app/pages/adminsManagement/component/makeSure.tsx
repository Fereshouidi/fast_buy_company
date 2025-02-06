'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { AdminDataParam } from "@/app/contexts/adminData";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { deleteManyAdmin } from "@/app/crud";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    allAdmins: AdminDataParam[]
    setAllAdmins: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
}

const MakeSure = ({exist, setExist, allAdmins, setAllAdmins,  adminSelected, setAdminSelected}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;

    const deleteAdminsSelect = async () => {

        if (adminSelected?.length == 0) {
            return setBanner(true, 'select admins by clicking on there id first !', 'fail');
        }
        setLoadingIcon(true);

        const done = await deleteManyAdmin(adminSelected);
        if (done) {
            setAllAdmins(allAdmins?.filter(admin => {return !adminSelected?.includes(admin)}));
            setBanner(true, `${adminSelected.length} admin(s) have been deleted successfully`, 'success');
            setAdminSelected([]);
        } else {
            setBanner(true, 'Something went wrong !', 'fail');
        }
        setLoadingIcon(false);
        setExist(false)
        
    }

    return (
        <div className={exist? 'make-sure-section' : 'invisible'}>
            <div className="form">
                <FontAwesomeIcon className="cancel" icon={faX} onClick={() => setExist(false)}/>
                <p>{`Are you sure you want to remove [${adminSelected?.map(admin => {return admin.name})}] from the application ?`}</p>
                <div className="handling">
                    <h4 className="no" onClick={() => setExist(false)}>no</h4>
                    <h4 className="yes" onClick={deleteAdminsSelect}>yes</h4>
                </div>
            </div>
        </div>
    )
}
export default MakeSure;