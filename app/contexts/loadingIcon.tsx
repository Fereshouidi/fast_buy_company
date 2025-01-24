import { createContext } from "react";

interface LoadingIconParams {
    exist: boolean;
    setExist: (value: boolean) => void;
  }
  
  export const LoadingIconContext = createContext<LoadingIconParams | undefined>(undefined);
  