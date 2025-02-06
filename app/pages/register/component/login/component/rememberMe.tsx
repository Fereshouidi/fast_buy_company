'use client';
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { LanguageSelectorContext } from '@/app/contexts/LanguageSelectorContext';
import { CSSProperties, useContext } from 'react';
import { AccountSavedContext } from '@/app/contexts/saveAccountContext';



const RememberMe = () => {
    
    const activeLanguage = useContext(LanguageSelectorContext)?.activeLanguage;
    const accountSavedContext = useContext(AccountSavedContext);

    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        accountSavedContext?.setAccountSaved(event.target.checked)
    }

    const style: CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    }
    const styleSpan: CSSProperties = {
        margin: ' 0 var(--small-margin)',
        fontSize: 'var(--small-size)'
    }

    return (
        <div className='remember-me' style={style}>

            <input type="checkbox" 
                checked={accountSavedContext?.accountSaved} 
                onChange={(event) => handleCheckBox(event)}
            />

            <span style={styleSpan}>{
                activeLanguage == 'english' ?
                    english.rememberMe
                : activeLanguage == 'arabic' ?
                    arabic.rememberMe
                : english.rememberMe
            }</span>

        </div>
    )
}
export default RememberMe