'use client';

import { AdminDataParam, permissionsAvailable, permissionsTranslations, PermissionType } from "@/app/contexts/adminData";
import { useContext, useState, useRef, useEffect } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUpDown } from "@fortawesome/free-solid-svg-icons";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";

type params = {
    allAdmins: AdminDataParam[];
    setAllAdmins: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    adminDataHasChanged: AdminDataParam[]
    setAdminDataHasChanged: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    employeeSelect: AdminDataParam | deleveryBoyData 
    setEmployeeSelect: (value: AdminDataParam | deleveryBoyData ) => void
};

const AdminsSection = ({ allAdmins, setAllAdmins, adminDataHasChanged, setAdminDataHasChanged, adminSelected, setAdminSelected, employeeSelect, setEmployeeSelect }: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [permissionListOpen, setPermissionListOpen] = useState<{ [key: string]: boolean }>({});
    const permissionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;

    const handlePermissionsChange = (
        adminId: string, 
        newPermissions: PermissionType[]
    ) => {
        setAllAdmins(prevAdmins =>
            prevAdmins.map(admin =>
                admin._id === adminId
                    ? { ...admin, permissions: newPermissions } 
                    : admin
            )
        );
    };
    const handleVerif = (admin: AdminDataParam) => {

        admin.verification = !admin.verification;
        setAllAdmins(prev => prev.map(del => del._id == admin._id ? admin : del));
        console.log(admin);
        setAdminDataHasChanged(prev => [...prev, admin]);
        
    }
    const calcAge = (dateOfBirth: Date) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
    
    
    return (
        <div className="admins-section">
            <table>
                <thead>
                    <tr>
                        <th>{activeLanguage?.idW}</th>
                        <th>{activeLanguage?.nameW}</th>
                        <th>{activeLanguage?.ageW}</th>
                        <th>{activeLanguage?.emailW}</th>
                        <th>{activeLanguage?.PhoneNumberW}</th>
                        <th>{activeLanguage?.passwordW}</th>
                        <th>{activeLanguage?.timeTableW}</th>
                        <th>{activeLanguage?.PermissionsW}</th>
                        <th>{activeLanguage?.activationW}</th>
                    </tr>
                </thead>
                <tbody>
                    {allAdmins?.map((admin) => (
                        <tr key={admin._id}>
                            <td className={ adminSelected?.includes(admin) ? 'ids-selected pointer' : 'pointer'} onClick={() => setAdminSelected(adminSelected?.includes(admin)? adminSelected.filter(admin_ => admin_._id != admin._id) : [...adminSelected, admin])}>{admin._id}</td>
                            <td>{admin.name}</td>
                            <td>{calcAge(admin.dateOfBirth) || 'N/A'}</td>
                            <td>{admin.email?? activeLanguage?.undefinedW}</td>
                            <td>{admin.phone?? activeLanguage?.undefinedW}</td>
                            <td>{'**********'}</td>
                            <td className="pointer" onClick={() => setEmployeeSelect(admin)}>{activeLanguage?.timeTableW}</td>
                            <td onClick={() => setPermissionListOpen(prev => ({ ...prev, [admin._id]: !permissionListOpen[admin._id] }))}>
                                <div
                                    id={permissionListOpen[admin._id] ? "permission-list" : "permission-list-close"}
                                    style={permissionListOpen[admin._id] ? {border: `0.5px solid ${primaryColor}`} : null}
                                    // onMouseEnter={() => setPermissionListOpen(prev => ({ ...prev, [admin._id]: true }))}
                                    // onMouseLeave={() => setPermissionListOpen(prev => ({ ...prev, [admin._id]: false }))}
                                    // onClick={() => setPermissionListOpen(prev => ({ ...prev, [admin._id]: !permissionListOpen[admin._id] }))}
                                    onClick={permissionListOpen[admin._id] ? (e) => e.stopPropagation() : null}
                                >
                                    {permissionListOpen[admin._id] ?
                                        permissionsAvailable.map((permission) => (
                                                <div key={permission} className="permission-div" ref={el => {
                                                    if (el) {
                                                        permissionRefs.current[`${admin._id}-${permission}`] = el;
                                                    }
                                                }}>
                                                    <input
                                                    className="pointer"
                                                        type="checkbox"
                                                        checked={admin.permissions?.includes(permission) ? true : false}
                                                        onChange={(e) => {
                                                            const newPermissions = e.target.checked
                                                                ? [...(admin.permissions || []), permission]
                                                                : admin.permissions?.filter(p => p !== permission) || [];
                                                            handlePermissionsChange(admin._id, newPermissions);
                                                            setAdminDataHasChanged([...allAdmins, admin])
                                                        }}
                                                    />
                                                    <h4>{activeLanguage?.language === 'arabic' ? permissionsTranslations[permission] : permission}</h4>
                                                </div>
                                            ))
                                        : 
                                        <div className="permission-close">
                                            {activeLanguage?.PermissionsW}
                                            <FontAwesomeIcon icon={faAngleDown} className="fa-angle-down"/>
                                        </div>  }
                                </div>
                            </td>
                            <td className={admin.verification ? 'verif' : ''} onClick={() => handleVerif(admin)}>{admin.verification ? activeLanguage?.yesW : activeLanguage?.noW}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminsSection;


// style={{backgroundColor: adminSelected?.includes(admin)? 'red': ''}}