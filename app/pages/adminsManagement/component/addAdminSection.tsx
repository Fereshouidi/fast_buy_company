'use client';

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, use, useContext, useEffect, useState } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { AdminDataParam, permissionsAvailable, permissionsTranslations, PermissionType } from "@/app/contexts/adminData";
import { createAdmin } from "@/app/crud";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    allAdmins: AdminDataParam[]
    setAllAdmins: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
}
const AddAdminSection = ({exist, setExist, allAdmins, setAllAdmins}: params) => {

    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [newAdmin, setNewAdmin] = useState<AdminDataParam | undefined>(undefined);
    const setBanner = useContext(BannerContext)?.setBanner;
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewAdmin({
                ...newAdmin,
                name: e.target.value
            })
        }
    }
    const handlepassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewAdmin({
                ...newAdmin,
                password: e.target.value
            })
        }
    }
    const handleRetypePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setNewAdmin({
                ...newAdmin,
                retypePassword: e.target.value
            })
        }
    }
    const handlePermission = (permission: PermissionType) => {
        if (newAdmin?.permissions?.includes(permission)) {
            setNewAdmin({
                ...newAdmin,
                permissions: (newAdmin?.permissions.filter(p => p != permission) || [])
            })
        } else {
            setNewAdmin({
                ...newAdmin,
                permissions: [...(newAdmin?.permissions || []), permission]
            })
        }
    }

    useEffect(() => {
        console.log(newAdmin);
        
    }, [newAdmin])

    const submate = async () => {
        setLoadingIcon(true);
        if (!newAdmin?.name || !newAdmin?.password || !newAdmin.retypePassword) {
            return setLoadingIcon(false);
        }
        if (newAdmin.password != newAdmin.retypePassword) {
            setBanner(true, activeLanguage?.passwordsDoNotMatch, 'fail');
            setLoadingIcon(false);
            return;
        }
        const newAdminDone = await createAdmin(newAdmin);
        if (newAdminDone) {
            setBanner(true, activeLanguage?.createAdminSuccessP, 'success');

        } else {
            setBanner(true, activeLanguage?.someErrorHappen);
        }
        setAllAdmins([...allAdmins, newAdminDone]);
        setLoadingIcon(false);
        setExist(false);
    }

    const styleInputs: CSSProperties = {
        // border: `1px solid ${primaryColor}` 
    }

    return <div className={exist? 'add-admin-section' : 'invisible'}>

        <div className="form">
            <FontAwesomeIcon className="cancel" icon={faX} onClick={() => setExist(false)}/>

            <h4 className="form-name">{activeLanguage?.newAdminW}</h4>
            <input type="text" className="user-name" placeholder={activeLanguage?.defaultNameW + '...'} style={styleInputs} onChange={(e) => handleName(e)}/>
            <input type="text" className="password" placeholder={activeLanguage?.defaultPasswordW + '...'} style={styleInputs} onChange={(e) => handlepassword(e)}/>
            <input type="text" className="password retype-password" placeholder={activeLanguage?.retypePasswordW + '...'} style={styleInputs} onChange={(e) => handleRetypePassword(e)}/>


            <h5 style={{marginTop: '10px'}}>{activeLanguage?.PermissionsW} :</h5>
            <div className="permissions">
                {permissionsAvailable?.map((permission, index) => (
                    <div key={index} className="permission-div">
                        <input 
                            type="checkbox" 
                            checked={newAdmin?.permissions?.includes(permission)} 
                            onChange={() => handlePermission(permission)} 
                        />
                        <span>
                            {activeLanguage?.language === 'arabic' ? permissionsTranslations[permission] : permission}
                        </span>
                    </div>
                ))}
            </div>

            <button className="submate-btn" style={{backgroundColor: newAdmin?.name && newAdmin?.password && newAdmin?.retypePassword ? '' : 'var(--ashen)'}} onClick={submate}>Submate</button>
            <p className="add-admin-explaination"> <strong>{activeLanguage?.ExplainW} :</strong> {activeLanguage?.addAdminExplaination}</p>
        </div>

    </div>
}
export default AddAdminSection;