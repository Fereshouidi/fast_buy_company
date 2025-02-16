'use client';
import { activeLanguageContext } from '@/app/contexts/activeLanguage';
import './style.css'
import { CSSProperties, useContext } from 'react';
import { profitParams } from '@/app/contexts/types';
import { CompanyInformationContext } from '@/app/contexts/companyInformation';
import english from '@/app/languages/english.json';

type params = {
    profits: profitParams[], 
    setProfits: (value: profitParams[]) => void;
    duration: 'lastWeek' | 'lastMounth' | 'all'
}
const Graph = ({profits, setProfits, duration}: params) => {

    const companyInformation = useContext(CompanyInformationContext);
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
     
    if (!profits) {
        return 'Loading...'    
    }
    const maximumValue = Math.max(...profits?.map(item => item.totalEarning)) *1.2 ;


    console.log(profits);
    
    const farmatDate = (date: Date) => {
       const date_ = new Date(date);
       const month = date_.getMonth() +1;
       const day = date_.getDate();

       const dateFormated = `${day}/${month}`;
       return dateFormated;
       
    }

    const getHeightColumn = (profit: profitParams) => {        
        return (profit.totalEarning * 100) / maximumValue;
    }
    const formatNum = (number: number) => {        
        if (number < 999) {
            return removeOneDecimal(number /1000) + 'k'
        } else if (number < 9999) {
            return removeOneDecimal(number /1000) + 'k'
        } else if (number < 99999) {
            return removeOneDecimal(number /1000) + 'k'
        } else if (number < 99999) {
            return removeOneDecimal(number /1000) + 'k'
        } else if (number < 999999) {
            return removeOneDecimal(number /1000) + 'k'
        } else if (number < 9999999) {
            return removeOneDecimal(number /1000000) + 'M'
        }
    }
    
    function removeOneDecimal(number: number) {
        let numStr = number.toString();

        //console.log(new Date().);
        
    
        if (numStr.includes('.')) {
            let [integerPart, decimalPart] = numStr.split('.');
            decimalPart = decimalPart.slice(0, 1);
            return parseFloat(`${integerPart}.${decimalPart}`);
        }
        return number;
    }
    
    const styleTittle: CSSProperties = {
        color: 'var(--black)'
    }
    
    const styleVerticalNumbering:CSSProperties = {
        marginLeft: activeLanguage?.language == 'arabic'? '' : '10%',
        marginRight: activeLanguage?.language == 'arabic'? '10%' : '',
    }
    const styleColumn:CSSProperties = {
        backgroundColor: companyInformation.primaryColor,
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box'
    }

    return (

        <div className='graph-container'>
            <h3 className='tittle' style={styleTittle}>{
                duration == 'lastWeek' ?  activeLanguage?.graphTittleForLastWeek + companyInformation.currencyType :
                duration == 'lastMounth' ? activeLanguage?.graphTittleForLastMonth + companyInformation.currencyType:
                activeLanguage?.graphTittleForAllSales + companyInformation.currencyType
            }</h3>

            <div className='graph'>
                
                <div className='horizontal-numbering'>
                    {
                        profits?.map((_, index) => {
                            return <span key={index}>{formatNum(Math.floor((maximumValue/profits.length) *(profits.length - index)))}</span>
                        })
                    }
                    <span>0</span>
                </div>

                <div className="display">
                    {profits.map((profit, index) => {
                        return <div className='column' key={index} style={{...styleColumn, height: getHeightColumn(profit)+'%'}}>
                            <span className={getHeightColumn(profit) > 20? 'profit-span': 'few-profit-span'} >{formatNum(profit.totalEarning) }</span>
                        </div>
                    })}
                </div>

                {/* getHeightColumn(profit) > 20 ? Math.floor(getHeightColumn(profit))+'%' : null */}
                
                <div className='vertical-numbering' style={styleVerticalNumbering}>
                    {
                        profits.map((_, index) => {
                            return <span key={index}>{farmatDate(profits[index].day)}</span>
                        })
                    }
                    {/* <span>12/10</span> <span>13/10</span> <span>14/10</span> <span>15/10</span> <span>16/10</span> <span>17/10</span> <span>18/10</span>  */}
                </div>

            </div>

        </div>
    )
}
export default Graph;