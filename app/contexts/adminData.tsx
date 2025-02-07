import { createContext } from "react";

export const permissionsAvailable = ['statistics', 'productsManagement', 'ordersManagment', 'adminsManagement', 'customersManagement'] as const;
export const permissionsTranslations = {
    statistics: "الإحصائيات",
    productsManagement: "إدارة المنتجات",
    ordersManagment: "إدارة الطلبات",
    adminsManagement: "إدارة المسؤولين",
    customersManagement: "إدارة العملاء"
};
export type PermissionType = (typeof permissionsAvailable)[number];

export interface AdminDataParam {
    _id?: string;
    name?: string;
    email?: string;
    phone?: number;
    dateOfBirth?: Date;
    password?: string;
    retypePassword?: string;
    token?: number;
    verification?: boolean;
    permissions?: PermissionType[]; 
}

export interface AdminParam {
    admin?: AdminDataParam;
    setAdmin: (value: AdminDataParam) => void;
}

export const AdminContext = createContext<AdminParam | undefined>(undefined);
