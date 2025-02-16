'use client';

import { AdminDataParam } from "@/app/contexts/adminData";
import { daysOfTheWeekTranslations, deleveryBoyData, hourAvailable } from "@/app/contexts/deleveryBoy";
import { CSSProperties, useContext, useRef } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { updateAdminTimeTable, updateDeleveryBoyTimeTable } from "@/app/crud";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";

type params = {
    allAdmins?: AdminDataParam[] ;
    setAllAdmins?: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    allDeliveryBoys?: deleveryBoyData[] | undefined;
    setAllDeliveryBoys?: React.Dispatch<React.SetStateAction<deleveryBoyData[]>>;
    employee?: deleveryBoyData | AdminDataParam | undefined;
    setEmployee?: React.Dispatch<React.SetStateAction<deleveryBoyData | AdminDataParam>>;
    employeesHasChanged?: boolean
    setEmployeesHasChanged?: (value: boolean) => void
    adminSelected?: AdminDataParam[]
    setAdminSelected?: React.Dispatch<React.SetStateAction<AdminDataParam[]>>
    
};
const TimeTable = ({employee, setEmployee, employeesHasChanged, setEmployeesHasChanged, allAdmins, setAllAdmins, allDeliveryBoys, setAllDeliveryBoys}: params) => {

    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const setBanner = useContext(BannerContext)?.setBanner;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const firstHour = parseInt(hourAvailable[0].split(":")[0], 10);
    const hourRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const doneBTNRef = useRef<HTMLDivElement>();


    function isAdmin(employee: deleveryBoyData | AdminDataParam): employee is AdminDataParam {
        return "permissions" in employee ;
    }
    function isDeleveryBoy(employee: deleveryBoyData | AdminDataParam): employee is deleveryBoyData {
        return !("permissions" in employee) ;
    }
    
    const handleTableChange = async ({ 
        employee, 
        day, 
        hour, 
        e
    }: { 
        employee: deleveryBoyData | AdminDataParam, 
        day: string, 
        hour: number, 
        e?: React.ChangeEvent<HTMLInputElement> 
    }) => {
    
        const updatedTimeTable = { ...employee.timeTable };
    
        const existingHourIndex = updatedTimeTable[day]?.findIndex(h => h.hour === hour);
    
        if (!e || !e.target) {
            console.log(updatedTimeTable[day][existingHourIndex]);
            
            if (updatedTimeTable[day][existingHourIndex]) {
                updatedTimeTable[day] = updatedTimeTable[day].filter(item => item.hour != hour);
                return setEmployee({
                    ...employee,
                    timeTable: updatedTimeTable
                });
                
            }

            if (existingHourIndex !== undefined && existingHourIndex !== -1) {
                updatedTimeTable[day][existingHourIndex].role = '✅';
            } else {
                updatedTimeTable[day] = [...(updatedTimeTable[day] || []), { hour, role: '✅' }];
            }

        } else {

            if (existingHourIndex !== undefined && existingHourIndex !== -1) {
                updatedTimeTable[day][existingHourIndex].role = e.target.value;
            } else {
                updatedTimeTable[day] = [...(updatedTimeTable[day] || []), { hour, role: e.target.value }];
            }    

        }

        setEmployee({
            ...employee,
            timeTable: updatedTimeTable
        });

        setEmployeesHasChanged(true);
    };
    
    const handleDone = async () => {
        setLoadingIcon(true);
        if (isAdmin(employee)) { 
            const updatedAdmin = await updateAdminTimeTable(employee._id, employee.timeTable);
            console.log(updatedAdmin);
            if (updatedAdmin) {
                setAllAdmins(allAdmins.map(admin => admin._id == updatedAdmin._id ? updatedAdmin : admin ))
                setBanner(true, `${updatedAdmin.name}'s timetable has been successfully modified`, 'success');
            } else {
                setBanner(true, activeLanguage?.someErrorHappen, 'fail');
            }
        } else if (isDeleveryBoy(employee)) { 
            const updatedDeleveryBoy = await updateDeleveryBoyTimeTable(employee._id, employee.timeTable);
            console.log(updatedDeleveryBoy);
            if (updatedDeleveryBoy) {
                setAllDeliveryBoys(allDeliveryBoys.map(deliveryBoys => deliveryBoys._id == updatedDeleveryBoy._id ? updatedDeleveryBoy : deliveryBoys ))
                setBanner(true, `${updatedDeleveryBoy.name}'s timetable has been successfully modified`,'success');
            } else {
                setBanner(true, activeLanguage?.someErrorHappen), 'fail';
            }
        }
        setLoadingIcon(false);
    }

    const styleDirection: CSSProperties = {
        direction: activeLanguage?.language == 'arabic' ? 'rtl' : 'ltr'
    }
    return (
        <div className={employee? "tame-table-container" : "invisible"} onClick={() => {setEmployeesHasChanged(false), setEmployee(undefined)}}>

            <div className={employeesHasChanged ? "done-btn" : "invisible"} style={{backgroundColor: employeesHasChanged ? 'green' : '', color: employeesHasChanged ? 'white' : ''}} ref={doneBTNRef} onClick={handleDone} >
                <FontAwesomeIcon icon={faCheck}/>
                {activeLanguage?.doneW}
            </div>

            <table style={styleDirection}>
                <thead>
                    <tr>
                        <th></th>
                        {hourAvailable?.map((hour, index) => {
                            return <th key={index} style={styleDirection}>{hour}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                {employee && employee.timeTable &&
                    Object.entries(employee.timeTable).map(([day, hours], dayIndex) => (
                        <tr key={dayIndex}>
                            <td style={{ padding: '0 5px' }}>
                                {activeLanguage?.language === 'arabic' ? daysOfTheWeekTranslations[day] : day}
                            </td>
                            {hourAvailable.map((hour, hourIndex) => (
                                <td
                                    key={hourIndex}
                                    style={{
                                        backgroundColor: hours.some(hourObj => hourObj.hour === firstHour + hourIndex) ? primaryColor : "",
                                        textAlign: 'center',
                                        padding: '5px',
                                        cursor: hours.some(hourObj => hourObj.hour === firstHour + hourIndex) ? 'pointer' : 'cell'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {
                                        hours.some(hourObj => hourObj.hour === firstHour + hourIndex) 
                                            ? hours.find(hourObj => hourObj.hour === firstHour + hourIndex)?.role
                                            : ""
                                    }
                                    <input type="text" 
                                    style={{backgroundColor: hours.some(hourObj => hourObj.hour === firstHour + hourIndex) ? primaryColor : ""}}
                                    defaultValue={
                                        hours.some(hourObj => hourObj.hour === firstHour + hourIndex) 
                                            ? String(hours.find(hourObj => hourObj.hour === firstHour + hourIndex)?.role)
                                            : ""
                                    }
                                    ref={el => {
                                        if (el) {
                                            hourRefs.current[`${employee._id}-${day} ${hour}`] = el;
                                        }
                                    }}
                                    onChange={(e) => handleTableChange({employee, day, hour: parseInt(hour.split(":")[0], 10), e})}
                                    onClick={(e) => handleTableChange({employee, day, hour: parseInt(hour.split(":")[0], 10)})}
                                    />
                                </td>


                            ))}
                        </tr>
                    ))
                }

                </tbody>
            </table>


        </div>
    )
}
export default TimeTable;