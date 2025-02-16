'use client';
import Card from "@/app/components/productsCard/card";
import { OrderParams } from "@/app/contexts/order";
import { purchaseParams } from "@/app/contexts/purchaseData";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type params = {
    customerHistorique: OrderParams[]
    setCustomerHistorique: (value: OrderParams[]) => void
}
const HistoriqueSection = ({customerHistorique, setCustomerHistorique}: params) => {

    const timeFormat = (date: Date) => {
        const date_ = new Date(date);

        const year = date_.getFullYear();
        const month = date_.getMonth() + 1;
        const day = date_.getDate();
        const hour = date_.getHours();
        const munite = date_.getMinutes();

        return `${year}/${month}/${day}  ${hour}:${munite}`
    }
    
    
    return (
        <div 
            className={customerHistorique?.length > 0 ? 'historique-section' : 'invisible'} 
            onClick={() => setCustomerHistorique([])}
        >
            <div className="container">

                <div className="header">
                    <FontAwesomeIcon icon={faX} className="cancel" onClick={() => setCustomerHistorique([])}/>
                        <h4>{`historique`}</h4>
                </div>

                <div className="scroll scroll-div">
                    {customerHistorique.map((order, index) => {
                            
                        return order.purchases.map((purchase, index) => {
                            return <div  key={index}>

                                <Card product={purchase.product}/>

                                <div id="time">
                                    <h4>{timeFormat(order.createdAt)}</h4>
                                </div>

                            </div>
                            

                        })

                    })
                    }
                </div>

            </div>
        </div>
    )
}
export default HistoriqueSection;