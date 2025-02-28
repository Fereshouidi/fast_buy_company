import { createContext } from "react";

export const permissionsAvailable = ['statistics', 'productsManagement', 'ordersManagement', 'adminsManagement', 'customersManagement', 'companyManagement'] as const;
export const permissionsTranslations = {
    statistics: "الإحصائيات",
    productsManagement: "إدارة المنتجات",
    ordersManagement: "إدارة الطلبات",
    adminsManagement: "إدارة المسؤولين",
    customersManagement: "إدارة العملاء",
    companyManagement: "ادارة بيانات الشركة"
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
    timeTable?: {
        monday: [{
            hour: Number,
            role: String
        }],
        tuesday: [{
            hour: Number,
            role: String
        }],
        wednesday: [{
            hour: Number,
            role: String
        }],
        thursday: [{
            hour: Number,
            role: String
        }],
        friday: [{
            hour: Number,
            role: String
        }],
        saturday: [{
            hour: Number,
            role: String
        }],
        sunday: [{
            hour: Number,
            role: String
        }],
    },
}


export interface AdminParam {
    admin?: AdminDataParam;
    setAdmin: (value: AdminDataParam) => void;
}

export const AdminContext = createContext<AdminParam | undefined>(undefined);
