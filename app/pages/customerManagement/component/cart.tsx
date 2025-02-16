'use client';

import Card from "@/app/components/productsCard/card";
import { shoppingCart } from "@/app/contexts/customerData";
import { purchaseParams } from "@/app/contexts/purchaseData";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type params = {
    customerCart: shoppingCart
    setCustomerCart: (value: shoppingCart) => void
}
const CartSection = ({customerCart, setCustomerCart}: params) => {

    return (
        <div 
            className={customerCart?.purchases?.length > 0 ? 'cart-section' : 'invisible'} 
            onClick={() => setCustomerCart(null)}
        >
            <div className="container">

                <div className="header">
                    <FontAwesomeIcon icon={faX} className="cancel" onClick={() => setCustomerCart(null)}/>
                        <h4>{`shopping cart`}</h4>
                </div>

                <div className="scroll scroll-div">
                    {customerCart?.purchases?.map((purchase, index) => {
        
                            return <div  key={index}>

                                <Card product={purchase.product}/>

                            </div>
                            

                        })

                    }
                    
                </div>

            </div>
        </div>
    )
}
export default CartSection;