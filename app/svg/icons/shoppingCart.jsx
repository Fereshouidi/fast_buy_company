'use client';
import { CustomerDataContext } from "@/app/contexts/customerData";
import { useContext } from "react";

const ShoppingCartIcon = () => {


  const customer = useContext(CustomerDataContext)
  

  const styleDiv = {
    width: 'var(--primary-width)',
    height: 'var(--primary-height)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
  const styleSvg = {
    width: 'var(--half-width)',
    height: 'var(--half-height)',
    color: 'var(--black)',
  }
  const styleSpan = {
    width: 'calc(var(--half-width) - 5px)',
    height: 'calc(var(--half-height) - 5px)',
    fontSize: 'var(--small-size)',
    position: 'absolute',
    top: '5px',
    right: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    borderRadius: '50px'
  }
  return(
    <div style={styleDiv} >
      <svg style={styleSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6h14l-1.5 9H8L6 6z" fill="none" stroke="currentColor" />
          <circle cx="9" cy="20" r="2" fill="none" stroke="currentColor" />
          <circle cx="17" cy="20" r="2" fill="none" stroke="currentColor" />
          <line x1="6" y1="6" x2="4" y2="6" stroke="currentColor" />
      </svg>
      <span style={styleSpan}>{customer?.ShoppingCart && customer?.ShoppingCart.purchases ? customer?.ShoppingCart.purchases?.length : 0}</span>
    </div>
    
  )
};

export default ShoppingCartIcon;
