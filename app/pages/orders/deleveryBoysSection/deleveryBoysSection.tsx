'use client';
import { CSSProperties, useContext, useEffect, useState } from "react";
import Table from "./table";
import { getAllDeleveryBoys } from "@/app/crud";
import { AdminDataParam } from "@/app/contexts/adminData";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import TimeTable from "./timetable";
import OrdersSection from "./orders";
import { OrderParams } from "@/app/contexts/order";
import LoadingIcon from "@/app/svg/icons/loading/loading";
// import '../style.css';
// import '../../style.css';
 

const DeleveryBoysSection = () => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [allAdmins, setAllAdmins] = useState<AdminDataParam[] | undefined>(undefined);
    const [allDeleveryBoys, setAllDeleveryBoys] = useState<deleveryBoyData[] | undefined>(undefined);
    const [deleveryBoyHasChanged, setDeleveryBoyHasChanged] = useState<deleveryBoyData[]>([]);
    const [adminSelected, setAdminSelected] = useState<AdminDataParam[]>([]);
    const [deleveryBoySelected, setDeleveryBoySelected] = useState<deleveryBoyData[]>([]);
    const [employeeSelect, setEmployeeSelect] = useState<deleveryBoyData | undefined>(undefined);
    const [employeesHasChanged, setEmployeesHasChanged] = useState<boolean>(false);
    const [ordersSectionExit, setOrdersSectionExist] = useState<OrderParams[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            const deleveryBoys_ = await getAllDeleveryBoys();
            setAllDeleveryBoys(deleveryBoys_.filter(deliveryBoy => deliveryBoy?.type == 'employee'));
            console.log(deleveryBoys_);
            
        }
        fetchData()
    }, [])

    
    const style: CSSProperties = {
        width: '50vw',
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
        padding: 'var(--small-padding) var(--large-padding)',
        // opacity: 0.8,
        fontSize: 'small',
        position: 'fixed',
        top: 'var(--header-height)',
        zIndex: 500,
        width: '50vw',
        height: 'var(--header-height)',
        backgroundColor: 'var(--white)',
        display: 'flex',
        alignItems: 'end',
        color: 'var(--almost-black)'
    }

    return (
        <div style={style} id="delevery-boy-section" className="scroll-without-bar">
            <h4 style={styleH4}>{activeLanguage?.deleveryBoysW + ' : (' + allDeleveryBoys?.length + ')' }</h4>
            {allDeleveryBoys ? 
                <Table allDeleveryBoys={allDeleveryBoys} setAllDeleveryBoys={setAllDeleveryBoys} deleveryBoyHasChanged={deleveryBoyHasChanged} setDeleveryBoyHasChanged={setDeleveryBoyHasChanged} adminSelected={adminSelected} setAdminSelected={setAdminSelected} employeeSelect={employeeSelect} setEmployeeSelect={setEmployeeSelect} deleveryBoySelected={deleveryBoySelected} setDeleveryBoySelected={setDeleveryBoySelected} ordersSectionExit={ordersSectionExit} setOrdersSectionExist={setOrdersSectionExist}/> 
                : <div className="loading-icon-container">
                    <LoadingIcon className="loading-icon"/>
                </div>
            }
            <TimeTable employee={employeeSelect} setEmployee={setEmployeeSelect} employeesHasChanged={employeesHasChanged} setEmployeesHasChanged={setEmployeesHasChanged} allAdmins={allAdmins} setAllAdmins={setAllAdmins} allDeliveryBoys={allDeleveryBoys} setAllDeliveryBoys={setAllDeleveryBoys}/>
            <OrdersSection orders={ordersSectionExit} setOrders={setOrdersSectionExist}/>

        </div>
    )
}
export default DeleveryBoysSection;