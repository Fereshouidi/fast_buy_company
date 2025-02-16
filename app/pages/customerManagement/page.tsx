'use client';
import SearchBar from "@/app/components/smallComponent/searchBar";
import { AdminContext, AdminDataParam } from "@/app/contexts/adminData";
import { useContext, useEffect, useState } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import Header from "./component/header";
import CustomerSection from "./component/customersSection";
import { getAllCustomers } from "@/app/crud";
import './style.css'
import { CustomerDataParams } from "@/app/contexts/customerData";
import MakeSure from "./component/makeSure";

const CustomerManagementPage = () => {

    const adminData = useContext(AdminContext)?.admin;
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [allCustomer, setAllCustomer] = useState<CustomerDataParams[] | undefined>(undefined);
    const [customerDataHasChanged, setCustomerDataHasChanged] = useState<CustomerDataParams[]>([]);
    const [makeSureExist, setMakeSureExist] = useState<boolean>(false);
    const [customersSelected, setCustomersSelected] = useState<CustomerDataParams[]>([]);
    const [customersHasChanged, setCustomerssHasChanged] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const allCustomer = await getAllCustomers();
            setAllCustomer(allCustomer);
            console.log(allCustomer);
            
        }
        fetchData()
    }, [])

    useEffect(() => {
        console.log(customersSelected);
    }, [customersSelected])

    if (!adminData?.permissions?.includes('customersManagement')) {
        return (
            <div>{activeLanguage?.noPermessionP}</div>
        )
    } else {
        
        return (
            <div className="page admins-management-page"> 
                <Header allCustomer={allCustomer} setAllCustomer={setAllCustomer} customerDataHasChanged={customerDataHasChanged} setCustomerDataHasChanged={setCustomerDataHasChanged} customersSelected={customersSelected} setCustomersSelected={setCustomersSelected} makeSureExist={makeSureExist} setMakeSureExist={setMakeSureExist}/>
                <CustomerSection allCustomer={allCustomer} setAllCustomer={setAllCustomer} customerDataHasChanged={customerDataHasChanged} setCustomerDataHasChanged={setCustomerDataHasChanged} customersSelected={customersSelected} setCustomersSelected={setCustomersSelected} makeSureExist={makeSureExist} setMakeSureExist={setMakeSureExist}/>
                <MakeSure exist={makeSureExist} setExist={setMakeSureExist}  allCustomer={allCustomer} setAllCustomer={setAllCustomer} customerDataHasChanged={customerDataHasChanged} setCustomerDataHasChanged={setCustomerDataHasChanged} customersSelected={customersSelected} setCustomersSelected={setCustomersSelected} />
                
            </div>
        )
    }
}
export default CustomerManagementPage;
