'use client';
import Graph from '@/app/components/smallComponent/graph';
import './style.css';
import { getProfitLasMonth, getProfitLastWeek } from '@/app/crud';
import { useEffect, useState } from 'react';
import { profitParams } from '@/app/contexts/types';

const StatisticsPage = () => {

    const [profitLastWeek, setProfitLastWeek] = useState<profitParams[] | undefined>(undefined);
    const [profitLastMonth, setProfitLastMonth] = useState<profitParams[] | undefined>(undefined);
    const [profitAll, setProfitAll] = useState<profitParams[] | undefined>(undefined);
    // const [activeProfit, setActiveProfit] = useEffect<profitP
    const [profitDuration, setProfitDuration] = useState<'lastWeek' | 'lastMounth' | 'all'>('lastWeek');

    useEffect(() => {
        const fetchData = async () => {
            const profitLastWeekList = await getProfitLastWeek();
            const profitLastMonth = await getProfitLasMonth();
        
            setProfitLastWeek(profitLastWeekList);
            setProfitLastMonth(profitLastMonth);
        }
        fetchData()
    }, [])

    return (
        <div className="page Statistics-page">
            
            <section className="graph-sec">
                <Graph profits={profitDuration == 'lastWeek' ? profitLastWeek :
                    profitDuration == 'lastMounth' ? profitLastMonth : 
                    null
                } setProfits={setProfitLastWeek} duration={profitDuration}/>
            </section>

            <section className="information-sec">
                thh
                
            </section>

        </div>
    )
}
export default StatisticsPage;



