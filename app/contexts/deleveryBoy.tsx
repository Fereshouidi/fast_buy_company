import { createContext } from "react";
import { OrderParams } from "./order";

export const typesAvailable = ['employee', 'freelancer'] as const;

export const typesTranslations = {
    employee: "موظف",
    freelancer: "عامل حر",
};
export const daysOfTheWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;  
export const hourAvailable_ = ["00:00 - 01:00", "01:00 - 02:00", "02:00 - 03:00", "03:00 - 04:00", "04:00 - 05:00", "05:00 - 06:00", "06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00", "22:00 - 23:00", "23:00 - 00:00"] as const;
export const hourAvailable = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00"] as const;
export const daysOfTheWeekTranslations: Record<typeof daysOfTheWeek[number], string> = { monday: "الاثنين", tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس", friday: "الجمعة", saturday: "السبت", sunday: "الأحد" };

export type Type = (typeof typesAvailable)[number];

export interface deleveryBoyData {
    _id?: string;
    userName?: string;
    email?: string;
    phone?: number;
    dateOfBirth?: Date;
    password?: string;
    retypePassword?: string;
    token?: number;
    verification?: boolean;
    type?: Type
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
    ordersProcessing: OrderParams[]
    ordersDelivered: OrderParams[]
}

export interface DeleveryBoyParams {
    deleveryBoy?: deleveryBoyData;
    setDeleveryBoy: (value: deleveryBoyData) => void;
}

export const DeleveryBoyContext = createContext<DeleveryBoyParams | undefined>(undefined);
