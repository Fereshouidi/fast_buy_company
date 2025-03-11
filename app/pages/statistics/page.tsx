'use client';
import Graph from '@/app/components/smallComponent/graph';
import './style.css';
import { getLeast5SellingProducts, getProfitAll, getProfitLasMonth, getProfitLastWeek, getTop10BestSellingProducts, getTop5LowestStock } from '@/app/crud';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { profitParams } from '@/app/contexts/types';
import { AdminContext } from '@/app/contexts/adminData';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import Top10BestSellingProducts from './Top10BestSellingProducts';
import { productParams } from '@/app/contexts/productSelectForShowing';
import Top5LowestStock from './top5LowestStock';
import LoadingIcon from '@/app/svg/icons/loading/loading';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const StatisticsPage = () => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage; 
    const [profitLastWeek, setProfitLastWeek] = useState<profitParams[] | undefined>(undefined);
    const [profitLastMonth, setProfitLastMonth] = useState<profitParams[] | undefined>(undefined);
    const [profitAll, setProfitAll] = useState<profitParams[] | undefined>(undefined);
    const adminData = useContext(AdminContext)?.admin;
    const [activeProfitDuration, setActiveProfitDuration] = useState<'lastWeek' | 'lastMounth' | 'all'>('all');
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [top5BestSellingProducts, setTop5BestSellingProducts] = useState<{product: productParams, totalSold: number, totalProfit: number}[]>(undefined);
    const [least5SellingProducts, setLeast5SellingProducts] = useState<{product: productParams, totalSold: number, totalProfit: number}[]>(undefined);
    const [top5LowestStock, setTop5LowestStock] = useState<productParams[]>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const profitLastWeekList = await getProfitLastWeek();
            const profitLastMonth = await getProfitLasMonth();
            const profitAll = await getProfitAll();
            // const top10BestSellingProducts = await getTop10BestSellingProducts();
            // const least5SellingProducts = await getLeast5SellingProducts();
            // const top5LowestStock = await getTop5LowestStock();
            setProfitLastWeek(profitLastWeekList);
            setProfitLastMonth(profitLastMonth);
            setProfitAll(profitAll);
            // setTop5BestSellingProducts(top10BestSellingProducts);
            // setLeast5SellingProducts(least5SellingProducts.reverse());
            // setTop5LowestStock(top5LowestStock.reverse());
            
        }
        fetchData()
    }, [])

    const styleActiveProfitDuration: CSSProperties = {
        backgroundColor: primaryColor
    }

    if (!adminData?.permissions?.includes('statistics')) {                

        return (
            <div className="page">
                'You do not have the permissions to see the statistics !'
            </div>
        )

    } else {

        return (
            <div className="page Statistics-page">
                
                <section className="graph-sec">

                    <Graph profits={activeProfitDuration == 'lastWeek' ? profitLastWeek :
                        activeProfitDuration == 'lastMounth' ? profitLastMonth : 
                        activeProfitDuration == 'all' ? profitAll :
                        null
                    } setProfits={setProfitLastWeek} duration={activeProfitDuration}/>

                    <div className='graph-control'>
                        <h4 
                            className='graph-control-btn'
                            onClick={() => setActiveProfitDuration('lastWeek')}
                            style={activeProfitDuration == 'lastWeek' ? styleActiveProfitDuration : null}
                        >{activeLanguage?.lastWeekW}</h4>
                        <h4 
                            className='graph-control-btn'
                            onClick={() => setActiveProfitDuration('lastMounth')}
                            style={activeProfitDuration == 'lastMounth' ? styleActiveProfitDuration : null}
                        >{activeLanguage?.lastMonthW}</h4>
                        <h4 
                            className='graph-control-btn'
                            onClick={() => setActiveProfitDuration('all')}
                            style={activeProfitDuration == 'all' ? styleActiveProfitDuration : null}
                        >{activeLanguage?.allW}</h4>
                    </div>

                </section>

                <section className="information-sec">

                    <Top10BestSellingProducts top5BestSellingProducts_={top5BestSellingProducts} least5SellingProducts_={least5SellingProducts}/>
                    <Top5LowestStock top5LowestStock_={top5LowestStock}/>

                    
                
                </section>

            </div>
        )
    }
}
export default StatisticsPage;



