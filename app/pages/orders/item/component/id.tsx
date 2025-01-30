'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { OrderParams } from "@/app/contexts/order";
import { CSSProperties, useContext } from "react";

type parmas = {
    order: OrderParams
    style: CSSProperties
}
const IdDiv = ({order, style}: parmas) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;


    const styleP: CSSProperties = {
        margin: '0 var(--small-margin)',
        fontSize: 'calc(var(--small-size) /1.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
    return (
        <div style={style}>
            <p style={styleP}>{activeLanguage?.OrderIDW}</p>
            <span>{order._id}</span>
        </div>
    )
}
export default IdDiv;