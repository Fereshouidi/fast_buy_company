'use client';

import { OrderParams } from "@/app/contexts/order";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import Item from "../item/item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

type params = {
    orders: OrderParams[] | undefined
    setOrders?: (value: OrderParams[]) => void
}
const ProccessiongSection = ({orders, setOrders}: params) => {

    const [proccessingOrders, setProccessingOrders ] = useState<OrderParams[] | undefined>(undefined)
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;

    useEffect(() => {
        if (orders){
            const ordersList = [];
            for (let index = 0 ; index < orders?.length ; index++) {
                if (orders[index].status != 'delivered' && orders[index].status != 'failed') {
                    ordersList.push(orders[index])
                }
            }
            setProccessingOrders(ordersList)
        }
    }, [orders])

    

    if (typeof window == 'undefined') {
        return;
    }
    
    const style: CSSProperties = {
        width: '100%',
        height: 'calc(100vh - calc( var(--header-height) *2) )',
        backgroundColor: 'var(--white)',
        margin: '0',
        borderRadius: '20px',
        padding: '0 var(--large-padding)',
        overflowY: 'scroll',
        // boxShadow: '0 5px 15px var(--black-almost-transparnt)',

    }
    const styleH4: CSSProperties = {
        opacity: 0.7,
        color: 'var(--black)'
    }
    const styleItemsContainer: CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 'var(--large-margin) 0',
        padding: 'var(--large-padding) 0',

    }
    const StyleEmptySuccessOrderDiv: CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: 'auto',
        padding: '10vh',
        opacity: 0.7,
        color: 'var(--black)',    
    }
    const StyleEmptySuccessOrder: CSSProperties = {
        width: '40%',
        height: 'auto',
        margin: 'calc(var(--large-margin) * 4)',
        opacity: 0.7,
        color: 'var(--black)',
    }
    return (
        <div style={style} className="scroll">
            <h4 style={styleH4}>{activeLanguage?.proccessingW + ' (' + (proccessingOrders?.length || 0) + ') :'}</h4>
            {proccessingOrders && proccessingOrders.length > 0 ? 

                <div className="item" style={styleItemsContainer}>{
                    proccessingOrders?.map((order, index) => {
                        return <Item key={index} order={order} setOrders={setOrders}/>
                    })
                }</div>

                :  <div style={StyleEmptySuccessOrderDiv}> 
                        <FontAwesomeIcon icon={faBoxOpen} style={StyleEmptySuccessOrder}/> 
                        <p>{activeLanguage?.noProcessingOrderP}</p>
                    </div>
                }

        </div>
    )
}
export default ProccessiongSection;