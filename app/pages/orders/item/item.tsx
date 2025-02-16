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
import { updateOrderStatus } from "@/app/crud";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import DeliveryBoyTable from "./component/deliveryBoyTable";


type parmas = {
    order: OrderParams
    orders?: OrderParams[] | undefined
    setOrders?: (value: OrderParams[] | ((prev: OrderParams[]) => OrderParams[])) => void
}
const Item = ({order, orders, setOrders}: parmas) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [mostProductExpensive, setMostProductExpensive] = useState<productParams[] | undefined>(undefined);
    const [detailsDisplayed, setDetailsDisplayed] = useState<boolean>(false);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;


    useEffect(() => {
        if (order.products) {   
            const most3ProductExpensive = [...order.products].sort((a, b) => b.price - a.price).slice(0, 3);
            setMostProductExpensive(most3ProductExpensive);  
        }
    }, [])

    const updateStatus = async (e: React.MouseEvent<HTMLElement>, status: "processing" | "packaged" | "shipped" | "delivered" | "canceled" | "failed" | "Being returned" | "returned" | "cart" | "out_of_stock" | "ready_for_pickup") => {
        e.stopPropagation();
        setLoadingIcon(true);
        if (order) {
            const done = await updateOrderStatus(order._id, status);
            if (done) {
                setOrders && setOrders((prev: OrderParams[]) => 
                    prev.map((item) => 
                        item._id === order._id ? { ...item, status } : item
                    )
                );
            }
        }
        
        setLoadingIcon(false);
    }

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
    const styleCancel: CSSProperties = {
        // width: '100%',
        // display: 'flex',
        // justifyContent: 'end',
        // alignItems: 'center',
        fontSize: 'calc(var(--small-size) * 1.2)',
        padding: 'var(--medium-padding)',
        borderRadius: '50px'
        // position: "relative",
        // right: activeLanguage?.language != 'arabic' ? 'var(--extra-large-margin)' : '',
        // left: activeLanguage?.language != 'arabic' ? '' : 'var(--extra-large-margin)',
        // backgroundColor: 'red'
    }
    
    return (

        <div style={style} onClick={(e) => {e.stopPropagation(); setDetailsDisplayed(!detailsDisplayed)}}>

            <div style={styleCloseItem}>


                <div style={style_imagesèand_id_Div}>


                    <ImagesDiv most3ProductExpensive={mostProductExpensive} style={styleImagesDiv}/>

                    <IdDiv order={order} style={styleIdDiv}/>
                    
                </div>


                {order?.status != "delivered" && order?.status != "failed" && <div id="cancel-order-btn" style={styleCancel} onClick={(e) => updateStatus(e, 'failed')}>{activeLanguage?.cancelW}</div>}

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
                <DeliveryBoyTable order={order} allOrders={orders} setAllOrders={setOrders}/>
            </div>
            
            

        </div>

    )
}
export default Item;