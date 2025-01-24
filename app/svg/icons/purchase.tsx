'use client';

import { CSSProperties } from "react";

const PurchaseIcon = () => {



  const styleDiv: CSSProperties = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
  const styleSvg: CSSProperties = {
    color: 'var(--white)',
  }

  return(
    <div style={styleDiv} >
      <svg style={styleSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6h14l-1.5 9H8L6 6z" fill="none" stroke="currentColor" />
          <circle cx="9" cy="20" r="2" fill="none" stroke="currentColor" />
          <circle cx="17" cy="20" r="2" fill="none" stroke="currentColor" />
          <line x1="6" y1="6" x2="4" y2="6" stroke="currentColor" />
      </svg>
    </div>
    
  )
};

export default PurchaseIcon;
