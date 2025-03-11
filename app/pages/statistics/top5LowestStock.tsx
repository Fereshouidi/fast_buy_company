'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { getTop5LowestStock } from "@/app/crud";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import { useContext, useEffect, useState } from "react";

type params = {
    top5LowestStock_: productParams[]
}

const Top5LowestStock = ({top5LowestStock_}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage; 
    const [top5LowestStock, setTop5LowestStock] = useState<productParams[]>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const top5LowestStock = await getTop5LowestStock();
            setTop5LowestStock(top5LowestStock.reverse());
        }
        fetchData();
    }, [])


    return (
        <section className="section">
            
            <h4>top 5 Lowest Stock :</h4>

            {
                top5LowestStock?.length > 0 ? 

                <table>

                    <thead>
                        <tr>
                            <th className="rank"></th>
                            <th>product</th>
                            <th>stock</th>
                        </tr>
                    </thead>

                    <tbody>
                        {top5LowestStock?.map((product, index) => {
                            return <tr key={index}>
                                <td>{top5LowestStock.length - index}</td>
                                <td>{
                                    activeLanguage?.language == 'arabic' ?
                                    product.name.arabic
                                    : product.name.english
                                }</td>
                                <td>{product.quantity}</td>
                            </tr>
                        })}
                    </tbody>

                </table>
            :
            <div className='loading-icon-container'>
                <LoadingIcon className='loading-icon'/>
            </div>
            }

        </section>
    )
}
export default Top5LowestStock;