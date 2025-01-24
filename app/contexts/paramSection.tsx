import { createContext } from "react";

interface paramSectionParams {
    exist: boolean,
    setExist: (value: boolean) => void
    containerExist: boolean,
    setContainerExist: (value: boolean) => void
}

export const paramSectionContext = createContext<paramSectionParams | undefined>(undefined)