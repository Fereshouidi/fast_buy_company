'use client';
import SearchBar from "@/app/components/smallComponent/searchBar";
import { AdminContext, AdminDataParam } from "@/app/contexts/adminData";
import { useContext, useEffect, useState } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import Header from "./component/header";
import DeleveryBoysSection from "./component/deleveryBoysSection";
import AdminsSection from "./component/adminsSection";
import { getAllAdmin } from "@/app/crud";
import AddAdminSection from "./component/addAdminSection";
import './style.css'
import MakeSure from "./component/makeSure";

const AdminsManagementPage = () => {

    const adminData = useContext(AdminContext)?.admin;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [activeSection, setActiveSection] = useState<'adminSection' | 'deleveryBoySection'>('adminSection');
    const [allAdmins, setAllAdmins] = useState<AdminDataParam[] | undefined>(undefined);
    const [adminDataHasChanged, setAdminDataHasChanged] = useState<AdminDataParam[]>([]);
    const [adminSelected, setAdminSelected] = useState<AdminDataParam[]>([]);
    const [addAdminSectionExist, setAddAdminSectionExist] = useState<boolean>(false);
    const [makeSureExist, setMakeSureExist] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const admins_ = await getAllAdmin();
            setAllAdmins(admins_);
        }
        fetchData()
    }, [])

    useEffect(() => {
        console.log(activeSection);
    }, [activeSection])

    if (!adminData?.permissions?.includes('adminsManagement')) {
        return (
            <div>{activeLanguage?.noPermessionP}</div>
        )
    } else {
        
        return (
            <div className="page admins-management-page">
                <Header activeSection={activeSection} setActiveSection={setActiveSection} allAdmins={allAdmins} setAllAdmins={setAllAdmins} adminDataHasChanged={adminDataHasChanged} setAdminDataHasChanged={setAdminDataHasChanged}  addAdminSectionExist={addAdminSectionExist} setAddAdminSectionExist={setAddAdminSectionExist} adminSelected={adminSelected} setAdminSelected={setAdminSelected} makeSureExist={makeSureExist} setMakeSureExist={setMakeSureExist}/>
                {activeSection == 'adminSection' && <AdminsSection allAdmins={allAdmins} setAllAdmins={setAllAdmins} adminDataHasChanged={adminDataHasChanged} setAdminDataHasChanged={setAdminDataHasChanged} adminSelected={adminSelected} setAdminSelected={setAdminSelected}/>}
                {activeSection == 'deleveryBoySection' && <DeleveryBoysSection/>}
                <AddAdminSection exist={addAdminSectionExist} setExist={setAddAdminSectionExist} allAdmins={allAdmins} setAllAdmins={setAllAdmins}/>
                <MakeSure exist={makeSureExist} setExist={setMakeSureExist} allAdmins={allAdmins} setAllAdmins={setAllAdmins} adminSelected={adminSelected} setAdminSelected={setAdminSelected}/>
            </div>
        )
    }
}
export default AdminsManagementPage;