'use client';

import Card from "@/app/components/productsCard/card";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type params = {
    customerFavorite: productParams[]
    setCustomerFavorite: (value: productParams[]) => void
}

const FavoriteSection = ({customerFavorite, setCustomerFavorite}: params) => {

    //alert(customerFavorite.length)

    return (
        <div 
            className={customerFavorite?.length > 0 ? 'favorite-section' : 'invisible'} 
            onClick={() => setCustomerFavorite([])}
        >
            <div className="container">

                <div className="header">
                    <FontAwesomeIcon icon={faX} className="cancel" onClick={() => setCustomerFavorite([])}/>
                        <h4>{`favorite`}</h4>
                </div>

                <div className="scroll scroll-div">
                    {customerFavorite.map((product, index) => {
                        return <div key={index}>
                            <Card product={product}/>
                        </div>
                    })
                    }
                </div>

            </div>
        </div>
    )
}
export default FavoriteSection;