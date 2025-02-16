'use client';

import { OrderParams } from "@/app/contexts/order";
import Item from "../item/item";

type params = {
    orders: OrderParams[]
    setOrders: (value: OrderParams[]) => void
}
const OrdersSection = ({orders, setOrders}: params) => {

    return (
        <div className={orders.length > 0 ? 'orders-section scroll' : 'invisible'} onClick={() => setOrders([])}>

            <div className="container">{orders?.map((order, index) => {
                return <Item key={index} order={order} orders={orders} setOrders={setOrders}/>
            })}</div>

        </div>
    )
}
export default OrdersSection;