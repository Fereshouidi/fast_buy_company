'use client';

import { AdminDataParam} from "@/app/contexts/adminData";
import { deleveryBoyData, typesAvailable, typesTranslations } from "@/app/contexts/deleveryBoy";
import { useContext, useState, useRef, useEffect, CSSProperties } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import OrdersSection from "./orders";
import { OrderParams } from "@/app/contexts/order";
// import '../style.css';

type params = {
    allDeleveryBoys: deleveryBoyData[];
    setAllDeleveryBoys: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>;
    deleveryBoyHasChanged: deleveryBoyData[]
    setDeleveryBoyHasChanged: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>;
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    employeeSelect: deleveryBoyData 
    setEmployeeSelect: (value: deleveryBoyData ) => void
    deleveryBoySelected: deleveryBoyData[]
    setDeleveryBoySelected: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>
    ordersSectionExit: OrderParams[]
    setOrdersSectionExist: (value: OrderParams[]) => void
};

const DeleveryBoySection = ({ allDeleveryBoys, setAllDeleveryBoys, deleveryBoyHasChanged, setDeleveryBoyHasChanged, adminSelected, setAdminSelected, employeeSelect, setEmployeeSelect, deleveryBoySelected, setDeleveryBoySelected, ordersSectionExit, setOrdersSectionExist }: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;


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
    const handleVerif = (deleveryBoy: deleveryBoyData) => {

        deleveryBoy.verification = !deleveryBoy.verification;
        setAllDeleveryBoys(prev => prev.map(del => del._id == deleveryBoy._id ? deleveryBoy : del));
        console.log(deleveryBoy);
        setDeleveryBoyHasChanged(prev => [...prev, deleveryBoy]);
        
    }
    
    const idsStyle: CSSProperties = {
        //backgroundColor: 'red',
        width: '100%',
        height: 'auto',
        padding: '5px',
        // margin: '1px',
        boxSizing: 'border-box'
    }
    
    return (
        <div >
            <table>
                <thead>
                    <tr>
                        <th>{activeLanguage?.idW}</th>
                        <th>{activeLanguage?.nameW}</th>
                        <th>{activeLanguage?.emailW}</th>
                        <th>{activeLanguage?.PhoneNumberW}</th>
                        <th>{activeLanguage?.ordersProccessing}</th>
                        <th>{activeLanguage?.timeTableW}</th>
                    </tr>
                </thead>
                <tbody>
                    {allDeleveryBoys?.map((deleveryBoy) => (
                        <tr key={deleveryBoy._id}>
                            <td>{deleveryBoy._id}</td>
                            <td>{deleveryBoy.userName}</td>
                            <td>{deleveryBoy.email?? activeLanguage?.undefinedW}</td>
                            <td>{deleveryBoy.phone?? activeLanguage?.undefinedW}</td>
                            <td className="pointer" onClick={() => setOrdersSectionExist(deleveryBoy.ordersProcessing)}>{deleveryBoy.ordersProcessing.length}</td>
                            <td onClick={() => setEmployeeSelect(deleveryBoy)} className="pointer">{activeLanguage?.timeTableW}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleveryBoySection;