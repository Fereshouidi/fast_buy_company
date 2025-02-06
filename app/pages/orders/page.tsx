"use client";

import { useState, useEffect, CSSProperties, useContext } from "react";
import ProccessiongSection from './proccessingSection/proccessionSection';
import FailSection from './failedSection/failSection';
import SuccessSection from './successSection/successSection';
import { OrderParams } from '@/app/contexts/order';
import SwitchSections from './switchSections';
import { gtAllOrders } from "@/app/crud";
import DeleveryBoysSection from "./deleveryBoysSection/deleveryBoysSection";
import { AdminContext } from "@/app/contexts/adminData";

const OrderManagmentPage = () => {


    const [orders, setOrders] = useState<OrderParams[] | undefined>(undefined);
    const [activeSection, setActiveSection] = useState<'processingSection' | 'failseSection' | 'successSection'>('successSection');
    const adminData = useContext(AdminContext)?.admin;

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
    // padding: 'var(--large-padding)',
    overflow: 'hidden',
  }

  const style_fs_and_ss: CSSProperties = {
    width: '50%',
    height: 'calc(100vh - calc( var(--header-height) *1) )',
    backgroundColor: 'var(--white)' ,
    display: 'flex',
    // margin: 'var(--large-margin)',
    margin: '0',
    // borderRadius: '20px',
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

  
  if (!adminData?.permissions?.includes('ordersManagment')) {

    return (
        <div className="page">
          'You do not have orders management permissions !'
        </div>
    )

  } else {

    return (

      <div style={style}>

          <DeleveryBoysSection/>
          <div style={style_fs_and_ss} >
              <SwitchSections activeSection={activeSection} setActiveSection={setActiveSection}/>
              {activeSection == 'processingSection' &&  <ProccessiongSection orders={orders} setOrders={setOrders}/>}
              {activeSection == 'failseSection' && <FailSection orders={orders} setOrders={setOrders}/>} 
              {activeSection == 'successSection' && <SuccessSection orders={orders} setOrders={setOrders}/>}
          </div>
                              
      </div>
    )
  }
}
export default OrderManagmentPage;