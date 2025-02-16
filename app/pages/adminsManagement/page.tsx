'use client';
import SearchBar from "@/app/components/smallComponent/searchBar";
import { AdminContext, AdminDataParam } from "@/app/contexts/adminData";
import { useContext, useEffect, useState } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import Header from "./component/header";
import DeleveryBoysSection from "./component/deleveryBoysSection";
import AdminsSection from "./component/adminsSection";
import { getAllAdmin, getAllDeleveryBoys } from "@/app/crud";
import AddAdminSection from "./component/addAdminSection";
import './style.css'
import MakeSure from "./component/makeSure";
import DeleveryBoySection from "./component/deleveryBoysSection";
import TimeTable from "./component/timetable";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";

const AdminsManagementPage = () => {

    const adminData = useContext(AdminContext)?.admin;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [activeSection, setActiveSection] = useState<'adminSection' | 'deleveryBoySection'>('adminSection');
    const [allAdmins, setAllAdmins] = useState<AdminDataParam[] | undefined>(undefined);
    const [allDeleveryBoys, setAllDeleveryBoys] = useState<deleveryBoyData[] | undefined>(undefined);
    const [adminDataHasChanged, setAdminDataHasChanged] = useState<AdminDataParam[]>([]);
    const [deleveryBoyHasChanged, setDeleveryBoyHasChanged] = useState<deleveryBoyData[]>([]);
    const [adminSelected, setAdminSelected] = useState<AdminDataParam[]>([]);
    const [deleveryBoySelected, setDeleveryBoySelected] = useState<deleveryBoyData[]>([]);
    const [addAdminSectionExist, setAddAdminSectionExist] = useState<boolean>(false);
    const [deleveryBoySectionExist, setDeleveryBoySectionExist] = useState<boolean>(false);
    const [makeSureExist, setMakeSureExist] = useState<boolean>(false);
    const [employeeSelect, setEmployeeSelect] = useState<AdminDataParam | deleveryBoyData | undefined>(undefined);
    const [employeesHasChanged, setEmployeesHasChanged] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const admins_ = await getAllAdmin();
            const deleveryBoys_ = await getAllDeleveryBoys();
            setAllAdmins(admins_);
            setAllDeleveryBoys(deleveryBoys_);
            console.log(deleveryBoys_);
            
        }
        fetchData()
    }, [])

    useEffect(() => {
        console.log(employeeSelect);
    }, [employeeSelect])

    if (!adminData?.permissions?.includes('adminsManagement')) {
        return (
            <div>{activeLanguage?.noPermessionP}</div>
        )
    } else {
        
        return (
            <div className="page admins-management-page">
                <Header activeSection={activeSection} setActiveSection={setActiveSection} allAdmins={allAdmins} setAllAdmins={setAllAdmins} adminDataHasChanged={adminDataHasChanged} deleveryBoyHasChanged={deleveryBoyHasChanged} setDeleveryBoyHasChanged={setDeleveryBoyHasChanged} deleveryBoySelected={deleveryBoySelected} setDeleveryBoySelected={setDeleveryBoySelected} setAdminDataHasChanged={setAdminDataHasChanged}  addAdminSectionExist={addAdminSectionExist} setAddAdminSectionExist={setAddAdminSectionExist} adminSelected={adminSelected} setAdminSelected={setAdminSelected} makeSureExist={makeSureExist} setMakeSureExist={setMakeSureExist} allDeleveryBoys={allDeleveryBoys} setAllDeleveryBoys={setAllDeleveryBoys}/>
                {activeSection == 'adminSection' && <AdminsSection allAdmins={allAdmins} setAllAdmins={setAllAdmins} adminDataHasChanged={adminDataHasChanged} setAdminDataHasChanged={setAdminDataHasChanged} adminSelected={adminSelected} setAdminSelected={setAdminSelected} employeeSelect={employeeSelect} setEmployeeSelect={setEmployeeSelect}/>}
                {activeSection == 'deleveryBoySection' && <DeleveryBoysSection allDeleveryBoys={allDeleveryBoys} setAllDeleveryBoys={setAllDeleveryBoys} deleveryBoyHasChanged={deleveryBoyHasChanged} setDeleveryBoyHasChanged={setDeleveryBoyHasChanged} adminSelected={adminSelected} setAdminSelected={setAdminSelected} employeeSelect={employeeSelect} setEmployeeSelect={setEmployeeSelect} deleveryBoySelected={deleveryBoySelected} setDeleveryBoySelected={setDeleveryBoySelected}/>}
                <AddAdminSection exist={addAdminSectionExist} setExist={setAddAdminSectionExist} allAdmins={allAdmins} setAllAdmins={setAllAdmins}/>
                <MakeSure exist={makeSureExist} setExist={setMakeSureExist} activeSection={activeSection} setActiveSection={setActiveSection} allAdmins={allAdmins} setAllAdmins={setAllAdmins} allDeliveryBoys={allDeleveryBoys} setAllDeliveryBoys={setAllDeleveryBoys} adminSelected={adminSelected} setAdminSelected={setAdminSelected} deleveryBoySelected={deleveryBoySelected} setDeleveryBoySelected={setDeleveryBoySelected}/>
                <TimeTable employee={employeeSelect} setEmployee={setEmployeeSelect} employeesHasChanged={employeesHasChanged} setEmployeesHasChanged={setEmployeesHasChanged} allAdmins={allAdmins} setAllAdmins={setAllAdmins} allDeliveryBoys={allDeleveryBoys} setAllDeliveryBoys={setAllDeleveryBoys}/>
            </div>
        )
    }
}
export default AdminsManagementPage;