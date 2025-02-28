import { nameParams } from "./companyInformation"

export type BullentinBoard = {
    _id: string,
    name: nameParams,
    images: string[],
    changingTime: number,
    link: string,
    createdAt: Date
}