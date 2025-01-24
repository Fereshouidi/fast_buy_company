import { createContext } from "react";

interface SideBarContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
  }
  
  export const ThemeContext = createContext<SideBarContextType | undefined>(undefined);
  