'use client';

import { OrderParams } from "@/app/contexts/order";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { CSSProperties, useContext, useEffect, useState } from "react";
import ImagesDiv from "./component/images";
import IdDiv from "./component/id";
import Status from "./component/status";
import Thread from "./component/thread";
import TableDetails from "./component/table";
import OrderDetailsTable from "./component/orderDetailsTable";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";

type parmas = {
    order: OrderParams
    setOrders?: (value: OrderParams[]) => void
}
const Item = ({order, setOrders}: parmas) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [mostProductExpensive, setMostProductExpensive] = useState<productParams[] | undefined>(undefined);
    const [detailsDisplayed, setDetailsDisplayed] = useState<boolean>(false);

    useEffect(() => {
        if (order.products) {   
            const most3ProductExpensive = [...order.products];
            most3ProductExpensive.sort((a, b) => b.price - a.price)
            .slice(0, 3)
            setMostProductExpensive(most3ProductExpensive);  
        }
    }, [])


    const getDuration = (time: Date) => {
        const date = new Date(time);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
        if (years > 0) return `${years} ${activeLanguage?.time.yearW}`;
        if (months > 0) return `${months} ${activeLanguage?.time.monthW}`;
        if (days > 0) return `${days} ${activeLanguage?.time.dayW}`;
        if (hours > 0) return `${hours} ${activeLanguage?.time.hourW}`;
        return `${Math.floor(diff / (1000 * 60))} ${activeLanguage?.time.muniteW}`;
        
    }

    const style: CSSProperties = {
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        maxHeight: detailsDisplayed? '1000px' : '100px',
        border: `0.02px solid var(--black-almost-transparnt)`,
        borderRadius: '20px',
        margin: 'var(--medium-margin) 0',
        padding: 'var(--medium-padding)',
        backgroundColor: 'var(--almost-white)',
        cursor: "pointer",
        transition: 'max-height 0.5s ease',
        color: "var(--black)"
    }
    const styleCloseItem: CSSProperties = {
        width: '100%',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: "pointer"
    }
    const style_imagesèand_id_Div: CSSProperties = {
        display: 'flex',
        alignItems: 'center'
    }
    const styleImagesDiv: CSSProperties = {
        width: 'auto',
        marginRight: activeLanguage?.language == 'arabic'? '0' : 'calc(var(--large-margin) *1.5',
        marginLeft: activeLanguage?.language == 'arabic'? 'calc(var(--large-margin) *1.5' : '0',
        height: 'var(--primary-height)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',

    }
    const styleIdDiv: CSSProperties = {
        display: 'flex',
        fontSize: 'var(--small-size)',

    }
    const styleStatus: CSSProperties = {
        display: 'flex',
        fontSize: 'var(--small-size)',
        margin: '0 var(--small-margin)',
        color: order.status == 'failed' ? 'red' : order.status == 'delivered' ? 'green' : ''
    }
    const styleNote: CSSProperties = {
        display: 'flex',
        fontSize: 'var(--small-size)',
        margin: 'var(--large-margin)',
        opacity: 0.7
    }
    const style_duration_and_status_div: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 'var(--small-size)',
        margin: 'var(--large-margin)',
        opacity: 0.7
    }
    const style_duration: CSSProperties = {
        margin: 'var(--small-margin)',
    }
    
    return (

        <div style={style} onClick={() => setDetailsDisplayed(!detailsDisplayed)}>

            <div style={styleCloseItem}>

                <div style={style_imagesèand_id_Div}>

                    <ImagesDiv most3ProductExpensive={mostProductExpensive} style={styleImagesDiv}/>

                    <IdDiv order={order} style={styleIdDiv}/>
                    
                </div>


                <div style={style_duration_and_status_div}>

                    {order?.status != 'delivered' && order?.status != 'failed'  &&  <h5 style={style_duration}>{getDuration(order?.createdAt)}</h5>}
                    <Status order={order} style={styleStatus}/>

                </div>

            </div>

            <div style={detailsDisplayed ? {opacity: 1, maxHeight: '1000px', padding: 'auto', transition: '0.5s ease'} : {opacity: 0, maxHeight: 0, padding: 0, transition: '0.5s ease'}}>

                <Thread order={order} setOrders={setOrders}/>

                {order.note &&  <p style={styleNote}> <strong style={{margin: '0 var(--small-margin)'}}>{activeLanguage?.noteW + ' : '}</strong> {order.note} </p>}
                <TableDetails order={order}/>
                <OrderDetailsTable order={order}/>
            </div>
            
            

        </div>

    )
}
export default Item;