'use client';

import { AdminDataParam, permissionsAvailable, permissionsTranslations, PermissionType } from "@/app/contexts/adminData";
import { useContext, useState, useRef, useEffect } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUpDown } from "@fortawesome/free-solid-svg-icons";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { CustomerDataParams, shoppingCart } from "@/app/contexts/customerData";
import HistoriqueSection from "./historique";
import FavoriteSection from "./favorite";
import CartSection from "./cart";
import { purchaseParams } from "@/app/contexts/purchaseData";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { OrderParams } from "@/app/contexts/order";


type params = {
    allCustomer: CustomerDataParams[]
    setAllCustomer: React.Dispatch<React.SetStateAction<AdminDataParam[]>>;
    customerDataHasChanged: CustomerDataParams[]
    setCustomerDataHasChanged: React.Dispatch<React.SetStateAction<CustomerDataParams[]>>;
    customersSelected: CustomerDataParams[]
    setCustomersSelected: React.Dispatch<React.SetStateAction<CustomerDataParams[]>>
    makeSureExist: boolean
    setMakeSureExist:(value: boolean) => void
}
const CustomerSection = ({allCustomer, setAllCustomer, customerDataHasChanged, setCustomerDataHasChanged, customersSelected, setCustomersSelected, makeSureExist, setMakeSureExist}: params) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [customerHistorique, setCustomerHistorique] = useState<OrderParams[]>([]);
    const [customerCart, setCustomerCart] = useState<shoppingCart | undefined>(undefined);
    const [customerFavorite, setCustomerFavorite] = useState<productParams[]>([]);
    

    const handleVerif = (customer: CustomerDataParams) => {

        customer.verification = !customer.verification;
        setAllCustomer(prev => prev.map(del => del._id == customer._id ? customer : del));
        setCustomerDataHasChanged(prev => [...prev, customer]);
        
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
                        <th>{activeLanguage?.areaOfInterest}</th>
                        <th>{activeLanguage?.passwordW}</th>
                        <th>{activeLanguage?.favoriteW}</th>
                        <th>{activeLanguage?.shoppingCart}</th>
                        <th>{activeLanguage.historiqueW}</th>
                        <th>{activeLanguage?.activationW}</th>
                    </tr>
                </thead>
                <tbody>
                    {allCustomer?.map((customer, index) => (
                        <tr key={customer._id || index}>
                            <td className={ customersSelected?.includes(customer) ? 'ids-selected pointer id' : 'pointer id'} onClick={() => setCustomersSelected(customersSelected?.includes(customer)? customersSelected.filter(admin_ => admin_._id != customer._id) : [...customersSelected, customer])}>{customer._id}</td>
                            <td>{customer.userName}</td>
                            <td>{calcAge(customer.dateOfBirth) || 'N/A'}</td>
                            <td>{customer.email?? activeLanguage?.undefinedW}</td>
                            <td>{customer.phone?? activeLanguage?.undefinedW}</td>
                            {/* <td className="areOfInterrest">{customer.interrestedAbout?? activeLanguage?.undefinedW}</td> */}
                            <td className="areOfInterrest"><pre style={{
                                justifyContent: customer.interrestedAbout?.length > 25 ? '' : 'center'
                            }}>{customer.interrestedAbout?.length > 0 ? customer.interrestedAbout : activeLanguage?.undefinedW}</pre></td>
                            <td>{'**********'}</td>
                            <td onClick={() => setCustomerFavorite(customer.favorite)}>{customer.favorite?.length ?? 0}</td>
                            <td onClick={() => setCustomerCart(customer.ShoppingCart)}>{customer.ShoppingCart?.purchases?.length?? 0}</td>
                            <td onClick={() => setCustomerHistorique(customer.historique)}>{customer.historique?.length?? 0}</td>
                            <td className={customer.verification ? 'verif' : ''} onClick={() => handleVerif(customer)}>{customer.verification ? activeLanguage?.yesW : activeLanguage?.noW}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <HistoriqueSection customerHistorique={customerHistorique} setCustomerHistorique={setCustomerHistorique}/>
            <FavoriteSection customerFavorite={customerFavorite} setCustomerFavorite={setCustomerFavorite}/>
            <CartSection customerCart={customerCart} setCustomerCart={setCustomerCart}/>
        </div>
    );
};

export default CustomerSection;


