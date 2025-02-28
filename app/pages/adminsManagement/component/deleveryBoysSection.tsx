'use client';

import { AdminDataParam} from "@/app/contexts/adminData";
import { deleveryBoyData, typesAvailable, typesTranslations } from "@/app/contexts/deleveryBoy";
import { useContext, useState, useRef, useEffect } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";

type params = {
    allDeleveryBoys: deleveryBoyData[];
    setAllDeleveryBoys: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>;
    deleveryBoyHasChanged: deleveryBoyData[]
    setDeleveryBoyHasChanged: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>;
    adminSelected: AdminDataParam[]
    setAdminSelected: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    employeeSelect: AdminDataParam | deleveryBoyData 
    setEmployeeSelect: (value: AdminDataParam | deleveryBoyData ) => void
    deleveryBoySelected: deleveryBoyData[]
    setDeleveryBoySelected: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>
};

const DeleveryBoySection = ({ allDeleveryBoys, setAllDeleveryBoys, deleveryBoyHasChanged, setDeleveryBoyHasChanged, adminSelected, setAdminSelected, employeeSelect, setEmployeeSelect, deleveryBoySelected, setDeleveryBoySelected }: params) => {
    
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
    
    
    return (
        <div className="delevery-boys-section">
            <table>
                <thead>
                    <tr>
                        <th>{activeLanguage?.idW}</th>
                        <th>{activeLanguage?.nameW}</th>
                        <th>{activeLanguage?.ageW}</th>
                        <th>{activeLanguage?.emailW}</th>
                        <th>{activeLanguage?.PhoneNumberW}</th>
                        <th>{activeLanguage?.passwordW}</th>
                        <th>{activeLanguage?.typeW}</th>
                        <th>{activeLanguage?.ordersDeliveredW}</th>
                        <th>{activeLanguage?.ordersProccessing}</th>
                        <th>{activeLanguage?.timeTableW}</th>
                        <th>{activeLanguage?.activationW}</th>
                    </tr>
                </thead>
                <tbody>
                    {allDeleveryBoys?.map((deleveryBoy) => (
                        <tr key={deleveryBoy._id}>
                            <td className={ deleveryBoySelected?.includes(deleveryBoy) ? 'ids-selected pointer' : 'pointer'} onClick={() => setDeleveryBoySelected(deleveryBoySelected?.includes(deleveryBoy)? deleveryBoySelected.filter(deleveryBoy_ => deleveryBoy_._id != deleveryBoy._id) : [...deleveryBoySelected, deleveryBoy])}>{deleveryBoy._id}</td>
                            <td>{deleveryBoy.userName}</td>
                            <td>{calcAge(deleveryBoy.dateOfBirth) || 'N/A'}</td>
                            <td>{deleveryBoy.email?? activeLanguage?.undefinedW}</td>
                            <td>{deleveryBoy.phone?? activeLanguage?.undefinedW}</td>
                            <td>{'**********'}</td>
                            <td>{activeLanguage?.language === 'arabic' ? typesTranslations[deleveryBoy.type] : deleveryBoy.type}</td>
                            <td>{deleveryBoy.ordersDelivered?.length}</td>
                            <td>{deleveryBoy.ordersProcessing?.length}</td>
                            <td onClick={() => setEmployeeSelect(deleveryBoy)} className="pointer">{activeLanguage?.timeTableW}</td>
                            <td className={deleveryBoy.verification ? 'verif' : ''} onClick={() => handleVerif(deleveryBoy)}>{deleveryBoy.verification ? activeLanguage?.yesW : activeLanguage?.noW}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeleveryBoySection;


// style={{backgroundColor: adminSelected?.includes(admin)? 'red': ''}}