"use client";

import { useState, useEffect, CSSProperties } from "react";
import ProccessiongSection from './proccessingSection/proccessionSection';
import FailSection from './failedSection/failSection';
import SuccessSection from './successSection/successSection';
import { OrderParams } from '@/app/contexts/order';
import SwitchSections from './switchSections';
import { gtAllOrders } from "@/app/crud";

const OrderManagmentPage = () => {


    const [orders, setOrders] = useState<OrderParams[] | undefined>(undefined);
    const [activeSection, setActiveSection] = useState<'processingSection' | 'failseSection' | 'successSection'>('successSection');

    useEffect(() => {
        const fetchData = async () => {
          const allOrders = await gtAllOrders();
          setOrders(allOrders);
        }
        fetchData()
    }, [])


  
  const style: CSSProperties = {
    // width: '100vw',
    minHeight: 'calc(100vh - var(--header-height) )',
    backgroundColor: 'var(--almost-white)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row' ,
    padding: 'var(--large-padding)',
    overflow: 'hidden',
  }

  const style_fs_and_ss: CSSProperties = {
    width: '50%',
    height: 'calc(100vh - calc( var(--header-height) *2) )',
    backgroundColor: 'var(--white)' ,
    display: 'flex',
    margin: 'var(--large-margin)',
    borderRadius: '20px',
    //backgroundColor: 'red',
    padding: '0',
    boxSizing: 'border-box',
    //justifyContent: screenWidth > 800 ? 'center' : '',
    flexDirection: 'column',
    boxShadow: '0 5px 15px var(--black-almost-transparnt)',
    
  }


  useEffect(() => {
    console.log(orders);
    
  }, [orders])
    return (

      <div style={style}>
          {/* <ProccessiongSection orders={orders} setOrders={setOrders}/> */}
          <div style={style_fs_and_ss} >
              <SwitchSections activeSection={activeSection} setActiveSection={setActiveSection}/>
              {activeSection == 'processingSection' &&  <ProccessiongSection orders={orders} setOrders={setOrders}/>}
              {activeSection == 'failseSection' && <FailSection orders={orders} setOrders={setOrders}/>} 
              {activeSection == 'successSection' && <SuccessSection orders={orders} setOrders={setOrders}/>}
          </div>
                              
      </div>



    )
}
export default OrderManagmentPage;