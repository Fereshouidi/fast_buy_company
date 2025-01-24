import { createContext } from "react";

interface LanguageContextType {
    activeLanguage: string;
    setActiveLanguage: React.Dispatch<React.SetStateAction<string>>;
  }
  
  export const LanguageSelectorContext = createContext<LanguageContextType | undefined>(undefined);
  