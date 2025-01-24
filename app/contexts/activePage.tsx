import { createContext } from "react";

interface activePageParams {
    activePage: 'Statistics' | 'AdminSetting' | 'productsManagement' | 'ordersManagement' | 'CustomersManagement' | 'AdminsManagement' | 'CompanyManagement',
    setActivePage: (value: 'Statistics' | 'AdminSetting' | 'productsManagement' | 'ordersManagement' | 'CustomersManagement' | 'AdminsManagement' | 'CompanyManagement') => void;
}

export const ActivePageContext = createContext<activePageParams | undefined>(undefined)