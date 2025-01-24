
import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { createContext } from 'react';


export interface activeLanguageParams {
    activeLanguage: typeof english | typeof arabic
    setAtiveLanguage: (value: typeof english | typeof arabic) => void
}


export const ActiveLanguageContext = createContext<activeLanguageParams | undefined>(undefined);