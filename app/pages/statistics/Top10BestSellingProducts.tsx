'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { getLeast5SellingProducts, getTop10BestSellingProducts } from "@/app/crud";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import { useContext, useEffect, useState } from "react";

type params = {
    top5BestSellingProducts_: {product: productParams, totalSold: number, totalProfit: number}[]
    least5SellingProducts_:  {product: productParams, totalSold: number, totalProfit: number}[]
}
const Top10BestSellingProducts = ({top5BestSellingProducts_, least5SellingProducts_}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage; 
    const [top5BestSellingProducts, setTop5BestSellingProducts] = useState<{product: productParams, totalSold: number, totalProfit: number}[]>(undefined);
    const [least5SellingProducts, setLeast5SellingProducts] = useState<{product: productParams, totalSold: number, totalProfit: number}[]>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const top10BestSellingProducts = await getTop10BestSellingProducts();
            const least5SellingProducts = await getLeast5SellingProducts();
            setTop5BestSellingProducts(top10BestSellingProducts);
            setLeast5SellingProducts(least5SellingProducts.reverse());
        }
        fetchData();
    }, [])

    return (
        <div className="top-10-best-selling-products-sec">

            <h4>Top 5 Best Selling Products :</h4>

            {
                top5BestSellingProducts?.length > 0 ?

                <table>

                    <thead>
                        <tr>
                            <th className="rank">Rank</th>
                            <th>product</th>
                            <th>Selling num</th>
                            <th>profits</th>
                        </tr>
                    </thead>

                    <tbody>
                        {top5BestSellingProducts?.map((product, index) => {
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{
                                    activeLanguage?.language == 'arabic' ?
                                    product.product.name.arabic
                                    : product.product.name.english
                                }</td>
                                <td>{product.totalSold}</td>
                                <td>{product.totalProfit}</td>
                            </tr>
                        })}
                    </tbody>

                    
                </table>

            :
            <div className='loading-icon-container'>
                <LoadingIcon className='loading-icon'/>
            </div>

            }


            <h4>least 5 Selling Products :</h4>

            {
                least5SellingProducts?.length > 0 ?

                <table>

                    <thead>
                        <tr>
                            <th className="rank">Rank</th>
                            <th>product</th>
                            <th>Selling num</th>
                            <th>profits</th>
                        </tr>
                    </thead>

                    <tbody>
                        {least5SellingProducts?.map((product, index) => {
                            return <tr key={index}>
                                <td>{least5SellingProducts.length - index}</td>
                                <td>{
                                    activeLanguage?.language == 'arabic' ?
                                    product.product.name.arabic
                                    : product.product.name.english
                                }</td>
                                <td>{product.totalSold}</td>
                                <td>{product.totalProfit}</td>
                            </tr>
                        })}
                    </tbody>

                
                </table>
            :
                <div className='loading-icon-container'>
                    <LoadingIcon className='loading-icon'/>
                </div>

            }

        </div>
    )
}
export default Top10BestSellingProducts;