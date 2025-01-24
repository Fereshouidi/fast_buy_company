import { createContext, Dispatch, SetStateAction } from "react";

interface Params {
    activeImage: string | undefined,
    setActiveImage: Dispatch<SetStateAction<string | undefined>>,
    activeImageIndex: number ,
    setActiveImageIndex: Dispatch<SetStateAction<number>>,
    currentIndex: number | undefined,
    setCurrentIndex: Dispatch<SetStateAction<number>>
    imageWidth: number | undefined,
    setImageWidth: Dispatch<SetStateAction<number>>
}



export const ActiveImageContext = createContext<Params | undefined>(undefined);