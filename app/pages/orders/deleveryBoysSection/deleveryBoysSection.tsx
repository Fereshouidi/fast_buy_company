'use client';
import { CSSProperties, useContext, useEffect, useState } from "react";
import Table from "./table";
import { getAllAdmin, getAllDeleveryBoys } from "@/app/crud";
import { AdminContext, AdminDataParam } from "@/app/contexts/adminData";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import TimeTable from "./timetable";
import OrdersSection from "./orders";
import { OrderParams } from "@/app/contexts/order";
// import '../style.css';
// import '../../style.css';
 

const DeleveryBoysSection = () => {

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
    const [employeeSelect, setEmployeeSelect] = useState<deleveryBoyData | undefined>(undefined);
    const [employeesHasChanged, setEmployeesHasChanged] = useState<boolean>(false);
    const [ordersSectionExit, setOrdersSectionExist] = useState<OrderParams[]>([]);



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

    
    const style: CSSProperties = {
        width: '45%',
        height: 'calc(100vh - var(--header-height) )',
        // backgroundColor: 'var(--white)',
        display: 'flex',
        // justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 'var(--header-height)',
        // padding: 'var(--large-padding)',
        overflow: 'scroll',
        position: 'relative',
        
      }
      const styleH4: CSSProperties = {
        padding: 'var(--large-padding)',
        // opacity: 0.8,
        fontSize: 'small',
        position: 'fixed',
        top: 'var(--header-height)',
        zIndex: 500,
        width: '45%',
        height: 'var(--header-height)',
        backgroundColor: 'var(--white)',
        display: 'flex',
        alignItems: 'end'
    }

    return (
        <div style={style} id="delevery-boy-section" className="scroll-without-bar">
            <h4 style={styleH4}>{activeLanguage?.deleveryBoysW + ' : (' + allDeleveryBoys?.length + ')' }</h4>
            <Table allDeleveryBoys={allDeleveryBoys} setAllDeleveryBoys={setAllDeleveryBoys} deleveryBoyHasChanged={deleveryBoyHasChanged} setDeleveryBoyHasChanged={setDeleveryBoyHasChanged} adminSelected={adminSelected} setAdminSelected={setAdminSelected} employeeSelect={employeeSelect} setEmployeeSelect={setEmployeeSelect} deleveryBoySelected={deleveryBoySelected} setDeleveryBoySelected={setDeleveryBoySelected} ordersSectionExit={ordersSectionExit} setOrdersSectionExist={setOrdersSectionExist} />
            <TimeTable employee={employeeSelect} setEmployee={setEmployeeSelect} employeesHasChanged={employeesHasChanged} setEmployeesHasChanged={setEmployeesHasChanged} allAdmins={allAdmins} setAllAdmins={setAllAdmins} allDeliveryBoys={allDeleveryBoys} setAllDeliveryBoys={setAllDeleveryBoys}/>
            <OrdersSection orders={ordersSectionExit} setOrders={setOrdersSectionExist}/>

        </div>
    )
}
export default DeleveryBoysSection;