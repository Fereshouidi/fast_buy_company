"use client";

import english from '@/app/languages/english.json';
import arabic from '@/app/languages/arabic.json';
import { useState, useEffect, CSSProperties } from "react";
import { ThemeContext } from "@/app/contexts/ThemeContext";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { CustomerDataContext } from "./contexts/customerData";
import { CustomerDataParams } from "./contexts/customerData";
import { CompanyInformationContext } from "./contexts/companyInformation";
import { companyInformationsParams } from "./contexts/companyInformation";
// import { SideBarContext } from "@/app/contexts/SideBarContext";
import { useRouter } from "next/navigation";
import { LoadingIconContext } from "./contexts/loadingIcon";
import LoadingIcon_theHolePage from "./svg/icons/loading/loadingHoleOfThePage";
import { ActiveLanguageContext } from "./contexts/activeLanguage";
import { BannerContext } from './contexts/bannerForEverything';
import { getConpanyInformations } from './crud';
import StatisticsPage from './pages/statistics/page';
import { paramSectionContext } from './contexts/paramSection';
import { ActivePageContext } from './contexts/activePage';
import Header from './components/header';
import ProductManagmentPage from './pages/productManagment/page';
import Banner from './banners/bannerForEveryThing';



const App = () => {

  const router = useRouter();

  const [screenWidth, setScreenWidth] = useState<number>(0); 
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("activeTheme") || "light" ;
    }
    return "light";
  });
  const [customerData, setCustomerData] = useState<CustomerDataParams | undefined>(undefined);
  
  const [activeLanguage, setActiveLanguage] = useState("english");
  const [activeLanguage_, setActiveLanguage_] = useState<typeof english | typeof arabic>(english);
  const [sideBarExist, setSideBarExist] = useState(true);
  const [loadingIconExist, setLoadingIconExit] = useState<boolean>(false);
  const [bannerForEveryThing, setBannerForEveryThing] = useState<boolean>(false);
  const [bannerText, setBannerText] = useState<string | undefined>(undefined);
  const [paramSectionContainerExist, setParamSectionContainerExist] = useState<boolean>(false);
  const [paramSectionExist, setParamSectionExist] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<'Statistics' | 'AdminSetting' | 'productsManagement' | 'ordersManagement' | 'CustomersManagement' | 'AdminsManagement' | 'CompanyManagement'>('Statistics');

  const setBanner = (visibility: boolean, text: string | undefined) => {
    setBannerForEveryThing(visibility)
    setBannerText(text);
  }

const [conpanyInformations, setConpanyInformations] = useState<companyInformationsParams | undefined>();

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedLanguage_str = localStorage.getItem('activeLanguage_');

    if (storedLanguage_str) {
      const storedLanguage = JSON.parse(storedLanguage_str) ;

      setActiveLanguage_(
        storedLanguage.language == 'english' || storedLanguage.language == 'arabic' ? 
        storedLanguage : 
        english
      );  
    }
      
  }

  }, [typeof window !== "undefined" ? localStorage.getItem('activeLanguage_') : null]) 



useEffect(() => {
  
    const fetchData = async() => {
        const conpanyInformationsData = await getConpanyInformations();        
        setConpanyInformations(conpanyInformationsData);
    }
    fetchData();
}, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);

      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);






  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTheme", theme);
    }
  }, [theme]);

  useEffect(() => {
    
    if(theme == 'dark'){
      document.body.classList.remove('light');
      document.body.classList.add(theme);
    }else if(theme == 'light'){
      document.body.classList.remove('dark');
      document.body.classList.add(theme);
    }

    if(activeLanguage_.language != 'arabic'){
      document.body.classList.remove('arabic');
    }else{
      document.body.classList.add(activeLanguage_.language?? '');
    }

    if(window.innerWidth > 800){
      document.body.classList.add('computer');
    }else{
      document.body.classList.add('phone');
    }
    
  }, [theme, activeLanguage_, screenWidth]);
  
  useEffect(() => {
    if(customerData && !customerData?.verification && conpanyInformations?.activateAccountWhileSignin){
        router.push('/pages/register')
    }
    
}, [customerData, conpanyInformations])




  if (screenWidth === null) {
    return <div>Loading...</div>; 
  }

  if (!conpanyInformations) {
    return <LoadingIcon_theHolePage/>; 
  }

  const style:CSSProperties = {
    width: '100%',
    height: '100%',
    //backgroundColor: 'green'
  }

  // alert(activeLanguage_.language);
  
  return (
    <CompanyInformationContext.Provider value={{name: conpanyInformations.name, logo: conpanyInformations.logo, email: conpanyInformations.email, password: conpanyInformations.password, primaryColor: conpanyInformations.primaryColor, biggestDiscount: conpanyInformations.biggestDiscount, entities: conpanyInformations.entities, offersDetails: conpanyInformations.offersDetails, originalProductsPercentage: conpanyInformations.originalProductsPercentage,servises: conpanyInformations.servises, backgroundOfRegisterPage: conpanyInformations.backgroundOfRegisterPage, registerRequiredData: conpanyInformations.registerRequiredData , activateAccountWhileSignin: conpanyInformations.activateAccountWhileSignin, currencyType: conpanyInformations.currencyType}} >
        <LanguageSelectorContext.Provider value={{ activeLanguage, setActiveLanguage }}>
          <ActiveLanguageContext.Provider value={{activeLanguage: activeLanguage_, setAtiveLanguage: setActiveLanguage_}}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              {/* <SideBarContext.Provider value={{ sideBarExist, setSideBarExist }}> */}
                <CustomerDataContext.Provider value={customerData}>
                  <LoadingIconContext.Provider value={{exist: loadingIconExist , setExist: setLoadingIconExit}}>
                    <BannerContext.Provider value={{bannerexist: bannerForEveryThing,bannerText: bannerText , setBanner: setBanner}}>
                      <paramSectionContext.Provider value={{containerExist: paramSectionContainerExist, setContainerExist: setParamSectionContainerExist, exist: paramSectionExist, setExist: setParamSectionExist}}>
                        <ActivePageContext.Provider value={{activePage: activePage, setActivePage: setActivePage}} >

                          <div style={style}>
                            <LoadingIcon_theHolePage/>
                            <Banner/>

                            <Header/>
                            {activePage == 'Statistics' && <StatisticsPage/>}
                            {activePage == 'productsManagement' && <ProductManagmentPage/>}

                          </div>
                        </ActivePageContext.Provider>
                      </paramSectionContext.Provider>
                    </BannerContext.Provider>
                  </LoadingIconContext.Provider>
                </CustomerDataContext.Provider>
              {/* </SideBarContext.Provider> */}
            </ThemeContext.Provider>
          </ActiveLanguageContext.Provider>
        </LanguageSelectorContext.Provider>
    </CompanyInformationContext.Provider>

  );
  
};

export default App;
