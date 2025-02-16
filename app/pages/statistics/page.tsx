'use client';
import Graph from '@/app/components/smallComponent/graph';
import './style.css';
import { getProfitLasMonth, getProfitLastWeek } from '@/app/crud';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { profitParams } from '@/app/contexts/types';
import { AdminContext } from '@/app/contexts/adminData';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';

const StatisticsPage = () => {

    const [profitLastWeek, setProfitLastWeek] = useState<profitParams[] | undefined>(undefined);
    const [profitLastMonth, setProfitLastMonth] = useState<profitParams[] | undefined>(undefined);
    const [profitAll, setProfitAll] = useState<profitParams[] | undefined>(undefined);
    // const [activeProfit, setActiveProfit] = useEffect<profitP
    const adminData = useContext(AdminContext)?.admin;
    const [activeProfitDuration, setActiveProfitDuration] = useState<'lastWeek' | 'lastMounth' | 'all'>('lastWeek');
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;

    useEffect(() => {
        const fetchData = async () => {
            const profitLastWeekList = await getProfitLastWeek();
            const profitLastMonth = await getProfitLasMonth();
        
            setProfitLastWeek(profitLastWeekList);
            setProfitLastMonth(profitLastMonth);
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
                        null
                    } setProfits={setProfitLastWeek} duration={activeProfitDuration}/>

                    <div className='graph-control'>
                        <h4 
                            className='graph-control-btn'
                            onClick={() => setActiveProfitDuration('lastWeek')}
                            style={activeProfitDuration == 'lastWeek' ? styleActiveProfitDuration : null}
                        >last Week</h4>
                        <h4 
                            className='graph-control-btn'
                            onClick={() => setActiveProfitDuration('lastMounth')}
                            style={activeProfitDuration == 'lastMounth' ? styleActiveProfitDuration : null}
                        >last month</h4>
                        <h4 
                            className='graph-control-btn'
                            onClick={() => setActiveProfitDuration('all')}
                            style={activeProfitDuration == 'all' ? styleActiveProfitDuration : null}
                        >all</h4>
                    </div>

                </section>

                <section className="information-sec">
                    thh
                    
                </section>

            </div>
        )
    }
}
export default StatisticsPage;



