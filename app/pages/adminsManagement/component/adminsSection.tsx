'use client';

import { AdminDataParam, permissionsAvailable, PermissionType } from "@/app/contexts/adminData";
import { useContext, useState, useRef, useEffect } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUpDown } from "@fortawesome/free-solid-svg-icons";

type params = {
    allAdmins: AdminDataParam[];
    setAllAdmins: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    adminDataHasChanged: AdminDataParam[]
    setAdminDataHasChanged: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
};

const AdminsSection = ({ allAdmins, setAllAdmins, adminDataHasChanged, setAdminDataHasChanged, adminSelected, setAdminSelected }: params) => {
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [permissionListOpen, setPermissionListOpen] = useState<{ [key: string]: boolean }>({});
    const permissionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
    

    // checked={admin.permissions?.includes(permission) ? true : false}

    // console.log(allAdmins[1]?.permissions);
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Password</th>
                        <th>Permissions</th>
                        <th>Verification</th>
                    </tr>
                </thead>
                <tbody>
                    {allAdmins?.map((admin) => (
                        <tr key={admin._id}>
                            <td className={ adminSelected?.includes(admin) ? 'ids-selected' : ''} onClick={() => setAdminSelected(adminSelected?.includes(admin)? adminSelected.filter(admin_ => admin_._id != admin._id) : [...adminSelected, admin])}>{admin._id}</td>
                            <td>{admin.name}</td>
                            <td>{calcAge(admin.dateOfBirth) || 'N/A'}</td>
                            <td>{admin.email?? 'null'}</td>
                            <td>{admin.phone?? 'null'}</td>
                            <td>{'**********'}</td>
                            <td>
                                <div
                                    id={permissionListOpen[admin._id] ? "permission-list" : "permission-list-close"}
                                    onMouseEnter={() => setPermissionListOpen(prev => ({ ...prev, [admin._id]: true }))}
                                    onMouseLeave={() => setPermissionListOpen(prev => ({ ...prev, [admin._id]: false }))}
                                >
                                    {permissionListOpen[admin._id] ?
                                        permissionsAvailable.map((permission) => (
                                                <div key={permission} className="permission-div" ref={el => {
                                                    if (el) {
                                                        permissionRefs.current[`${admin._id}-${permission}`] = el;
                                                    }
                                                }}>
                                                    <input
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
                                                    <h4>{permission}</h4>
                                                </div>
                                            ))
                                        : 
                                        <div className="permission-close">
                                            Permissions
                                            <FontAwesomeIcon icon={faAngleDown} className="fa-angle-down"/>
                                        </div>  }
                                </div>
                            </td>
                            <td className={admin.verification ? 'verif' : ''}>{admin.verification ? 'true' : 'false'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminsSection;


// style={{backgroundColor: adminSelected?.includes(admin)? 'red': ''}}