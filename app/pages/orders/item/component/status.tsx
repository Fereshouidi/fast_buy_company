'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { OrderParams } from "@/app/contexts/order";
import { CSSProperties, useContext } from "react";

type parmas = {
    order: OrderParams
    style: CSSProperties
}
const Status = ({order, style}: parmas) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;


    const translateStatus = (status: string) => {

        let translatedStatus = '';

        switch (status) {
            case 'processing':
                translatedStatus = activeLanguage?.orderStatus.processingW?? '';
                break;
            case 'packaged':
                translatedStatus = activeLanguage?.orderStatus.packagedW?? '';
                break;
            case 'shipped':
                translatedStatus = activeLanguage?.orderStatus.shippedW?? '';
                break;
            case 'delivered':
                translatedStatus = activeLanguage?.orderStatus.deliveredW?? '';
                break;
            case 'canceled':
                translatedStatus = activeLanguage?.orderStatus.canceledW?? '';
                break;
            case 'failed':
                translatedStatus = activeLanguage?.orderStatus.failedW?? '';
                break;
            case 'Being returned':
                translatedStatus = activeLanguage?.orderStatus.BeingReturnedW?? '';
                break;
            case 'returned':
                translatedStatus = activeLanguage?.orderStatus.returnedW?? '';
                break;
        }

         return translatedStatus;
    }


    const styleSpan: CSSProperties = {
        margin: '0 var(--small-margin)',
        opacity: 0.7
    }
    return (
        <div style={style}>
            <span style={styleSpan}>{translateStatus(order.status?? '')}</span>
        </div>
    )
}
export default Status;