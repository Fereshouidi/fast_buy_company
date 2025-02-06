import { createContext } from "react";

interface activePageParams {
    activePage: 'statistics' | 'productsManagement' | 'ordersManagement' | 'customersManagement' | 'adminsManagement' | 'companyManagement' | 'register',
    setActivePage: (value: 'statistics' | 'productsManagement' | 'ordersManagement' | 'customersManagement' | 'adminsManagement' | 'companyManagement' | 'register') => void;
}

export const ActivePageContext = createContext<activePageParams | undefined>(undefined);