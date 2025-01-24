import { createContext } from "react";

export interface bannerParams {
    bannerexist: boolean,
    bannerText: string | undefined,
    bannerStatus?: 'success' | 'fail' | null,
    setBanner: (visibility: boolean, text: string | undefined, status?: 'success' | 'fail' | null) => void
    
}
export const BannerContext = createContext<bannerParams | undefined>(undefined)