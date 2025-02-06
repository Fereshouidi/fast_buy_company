'use client';
import { CSSProperties } from "react";

 

const DeleveryBoysSection = () => {

    const style: CSSProperties = {
        width: '50vw',
        minHeight: 'calc(100vh - var(--header-height) )',
        backgroundColor: 'var(--almost-white)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row' ,
        // padding: 'var(--large-padding)',
        overflow: 'hidden',
      }
    return (
        <div style={style}>DeleveryBoysSection</div>
    )
}
export default DeleveryBoysSection;