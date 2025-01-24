import { createContext } from "react";

interface SideBarContextType {
    sideBarExist: boolean;
    setSideBarExist: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);
  