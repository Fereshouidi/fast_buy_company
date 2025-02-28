'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { deleveryBoyData } from "@/app/contexts/deleveryBoy";
import { OrderParams } from "@/app/contexts/order";
import { getDeliveryBoyById, updateOrderDeliveryBoy } from "@/app/crud";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { BannerContext } from "@/app/contexts/bannerForEverything";

type params = {
    order?: OrderParams
    allOrders: OrderParams[] | undefined
    setAllOrders: (value: OrderParams[] | ((prev: OrderParams[]) => OrderParams[])) => void
}
const DeliveryBoyTable = ({order, allOrders, setAllOrders}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const companyInformation = useContext(CompanyInformationContext);
    //const [isDone, setIsDone] = useState<boolean>(false);
    const [deliveryBoyId, setDeliveryBoyId] = useState<string>('');
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const setBanner = useContext(BannerContext)?.setBanner;

    const handleId = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (e.target) {
            const deliveryBoy = await getDeliveryBoyById(e.target.value);
            if (deliveryBoy) {
                setAllOrders((prev) => {
                    return prev.map(order_ => {
                        if (order_._id == order._id) {
                            const updatedOrder = {
                                ...order_,
                                deliveryBoy: deliveryBoy,
                                assignedAt: new Date()
                            }
    
                            return updatedOrder
                        }else {
                            return order_;
                        }
                    })
                })
                setDeliveryBoyId(e.target.value);
            }
        }
    }
    const timeFormat = (date: Date) => {
        const date_ = new Date(date);

        const year = date_.getFullYear();
        const month = date_.getMonth() + 1;
        const day = date_.getDate();
        const hour = date_.getHours();
        const munite = date_.getMinutes();

        //console.log(date);
    
        return `${year}/${month}/${day}  ${hour}:${munite}`
    }

    const handleConfirm = async (e: React.MouseEvent<HTMLElement>) => {
        
        setLoadingIcon(true);
        e.stopPropagation();
        const done = await updateOrderDeliveryBoy(order?._id, deliveryBoyId);
        if (done) {
            setBanner(true, activeLanguage?.orderReceived, 'success');
        } else {
            setBanner(true, activeLanguage?.someErrorHappen, 'fail');
        }
        setLoadingIcon(false);
    }

    useEffect(() => {
        console.log(order);
        console.log(order?.deliveryBoy);
        
    }, [allOrders])

    const StyleUpOfTable: CSSProperties = {
        width: '95%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'red'
    }
    const StyleConfirm: CSSProperties = {
        width: '50px',
        margin: '0 2.5% 5px 0',
        borderRadius: '50px',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        backgroundColor: deliveryBoyId ? 'green' : 'var(--ashen-semi-transparent)',
        color: 'white'
    }

    console.log(order.assignedAt);
    
    return (
        <div className="delivery-boy-table">
            <div style={StyleUpOfTable}>
                <h4>{activeLanguage?.deliveryBoyW} :</h4>
                {deliveryBoyId && <h4 style={StyleConfirm} onClick={(e) => handleConfirm(e)}>{activeLanguage?.confirmW}</h4>}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>{activeLanguage?.idW}</th>
                        <th>{activeLanguage?.nameW}</th>
                        <th>{activeLanguage?.PhoneNumberW}</th>
                        <th>{activeLanguage?.assignedAt}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td><input type="text" 
                            placeholder={activeLanguage?.idW + '...'} 
                            defaultValue={order?.deliveryBoy?._id} 
                            onChange={(e) => handleId(e)} 
                            onClick={(e) => e.stopPropagation()} 
                            disabled={order?.status == "failed" || order?.status == "delivered"}
                        /></td>

                        <td>{order?.deliveryBoy?.userName}</td>
                        <td>{order?.deliveryBoy?.phone}</td>
                        <td>{order.assignedAt ? timeFormat(order.assignedAt) : order?.deliveryBoy ? timeFormat(new Date()) : null }</td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default DeliveryBoyTable;