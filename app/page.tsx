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
import { activeLanguageContext } from "./contexts/activeLanguage";
import { BannerContext } from './contexts/bannerForEverything';
import { getAdminById, getConpanyInformations, updateAdminById } from './crud';
import StatisticsPage from './pages/statistics/page';
import { paramSectionContext } from './contexts/paramSection';
import { ActivePageContext } from './contexts/activePage';
import Header from './components/header';
import ProductManagmentPage from './pages/productManagment/page';
import Banner from './banners/bannerForEveryThing';
import OrderManagmentPage from './pages/orders/page';
import Register from './pages/register/page';
import { AdminContext, AdminDataParam } from './contexts/adminData';
import AdminsManagement from './pages/adminsManagement/page';
import AdminsManagementPage from './pages/adminsManagement/page';
import SigninForm from './pages/register/component/signin/signinForm';
import CustomerManagementPage from './pages/customerManagement/page';



const App = () => {

  const router = useRouter();

  const [screenWidth, setScreenWidth] = useState<number>(0); 
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("activeTheme") || "light" ;
    }
    return "light";
  });
  
  const [activeLanguage, setactiveLanguage] = useState("english");
  const [activeLanguage_, setactiveLanguage_] = useState<typeof english | typeof arabic>(english);
  const [adminData, setAdminData] = useState<AdminDataParam | undefined>(undefined);
  const [sideBarExist, setSideBarExist] = useState(true);
  const [loadingIconExist, setLoadingIconExit] = useState<boolean>(false);
  const [bannerForEveryThing, setBannerForEveryThing] = useState<boolean>(false);
  const [bannerText, setBannerText] = useState<string | undefined>(undefined);
  const [paramSectionContainerExist, setParamSectionContainerExist] = useState<boolean>(false);
  const [paramSectionExist, setParamSectionExist] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<'statistics' | 'productsManagement' | 'ordersManagement' | 'customersManagement' | 'adminsManagement' | 'companyManagement' | 'register'>('statistics');
  // const [logInExist, setLogInExist] = useState<boolean>(false);
  // const [signinExist, setSignInExist] = useState<boolean>(false);

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

      setactiveLanguage_(
        storedLanguage.language == 'english' || storedLanguage.language == 'arabic' ? 
        storedLanguage : 
        english
      );  
    }
      
  }

  }, [typeof window !== "undefined" ? localStorage.getItem('activeLanguage_') : null]) 


  //localStorage.setItem('adminData', '679fef2bbcfc0235ddf86b86');
  //localStorage.removeItem('adminData');
  //localStorage.setItem('adminData',  '67a13d0016ae24ea00827b7f');
  
  
  useEffect(() => {
    const fetchData = async () => {

      if (typeof window != "undefined") {
        const admintData_id = localStorage.getItem('adminData');
        
        if ( admintData_id ) {

          const admin = await getAdminById(admintData_id);

          // if (!admin.verification) {
          //   //setBanner(true, 'you have to verificate your account firt !');
          //   setSignInExist(true)
          //   setActivePage('register')
          //   console.log(admin);
          //   //return;
          //   //setActivePage('register')
          // }
          if (admin) {
            setAdminData(admin);
            setActivePage(admin?.permissions[0]?? 'statistics')
          }
          
        } else {
          //setActivePage('register')
          //return router.push('pages/register')
        }
      }

    }
    fetchData();
  }, [typeof window != 'undefined' ? localStorage.getItem('adminData') : null])


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

    if(activeLanguage_?.language != 'arabic'){
      document.body.classList.remove('arabic');
    }else{
      document.body.classList.add(activeLanguage_?.language?? '');
    }

    if(window.innerWidth > 800){
      document.body.classList.add('computer');
    }else{
      document.body.classList.add('phone');
    }
    
  }, [theme, activeLanguage_, screenWidth]);
  

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedLanguage_str = localStorage.getItem("activeLanguage_");
    if (storedLanguage_str) {
      const storedLanguage = JSON.parse(storedLanguage_str);
      setactiveLanguage_(storedLanguage.language === "english" || storedLanguage.language === "arabic"
        ? storedLanguage
        : english);
    }
  }
}, []);




  useEffect(() => {

    // if (adminData) {
    //   const fetchData = async () => {
    //     await updateAdminById(adminData);
    //   }
    //   fetchData()
    // }

    // if (!adminData?.verification) {
    //   setActivePage('register')
    // }

    console.log(adminData);
    
  }, [adminData])

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

  const styleSmallDisplay:CSSProperties = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'var(--white)',
  }


  if (screenWidth && screenWidth < 1200) {
    alert(activeLanguage_?.noSmallDisplayP);
  }
  //  alert(activeLanguage_?.language);
  
  return (
    <CompanyInformationContext.Provider value={{name: conpanyInformations.name, logo: conpanyInformations.logo, email: conpanyInformations.email, password: conpanyInformations.password, primaryColor: conpanyInformations.primaryColor, biggestDiscount: conpanyInformations.biggestDiscount, entities: conpanyInformations.entities, offersDetails: conpanyInformations.offersDetails, originalProductsPercentage: conpanyInformations.originalProductsPercentage,servises: conpanyInformations.servises, backgroundOfRegisterPage: conpanyInformations.backgroundOfRegisterPage, registerRequiredData: conpanyInformations.registerRequiredData , activateAccountWhileSignin: conpanyInformations.activateAccountWhileSignin, currencyType: conpanyInformations.currencyType, shippingCost: conpanyInformations.shippingCost}} >
        <LanguageSelectorContext.Provider value={{ activeLanguage, setactiveLanguage }}>
          <activeLanguageContext.Provider value={{activeLanguage: activeLanguage_, setAtiveLanguage: setactiveLanguage_}}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              {/* <SideBarContext.Provider value={{ sideBarExist, setSideBarExist }}> */}
                  <LoadingIconContext.Provider value={{exist: loadingIconExist , setExist: setLoadingIconExit}}>
                    <BannerContext.Provider value={{bannerexist: bannerForEveryThing,bannerText: bannerText , setBanner: setBanner}}>
                      <paramSectionContext.Provider value={{containerExist: paramSectionContainerExist, setContainerExist: setParamSectionContainerExist, exist: paramSectionExist, setExist: setParamSectionExist}}>
                        <ActivePageContext.Provider value={{activePage: activePage, setActivePage: setActivePage}} >
                          <AdminContext.Provider value={{admin: adminData, setAdmin: setAdminData}} >

                          { screenWidth && screenWidth > 1200 ? <div style={style}>
                          
                            <LoadingIcon_theHolePage/>
                            <Banner/>

                            {adminData && <Header/>}
                            {/* {activePage == 'statistics' && <StatisticsPage/>}
                            {activePage == 'productsManagement' && <ProductManagmentPage/>}
                            {activePage == 'ordersManagement' && <OrderManagmentPage/> }
                            {activePage == 'adminsManagement' && <AdminsManagementPage/>}
                            {activePage == 'customersManagement' && <CustomerManagementPage/>} */}
                            
                            {/* {activePage == 'register' && <Register logInExist={logInExist} signinExist={signinExist} adminData={adminData} setAdminData={setAdminData}/>} */}
                            {!adminData && <Register logInExist={true} signinExist={false} adminData={adminData} setAdminData={setAdminData}/>}
                            {adminData && !adminData?.verification && <Register logInExist={false} signinExist={true} adminData={adminData} setAdminData={setAdminData}/>}

                          </div> :
                          
                          <div style={styleSmallDisplay}>{activeLanguage_?.noSmallDisplayP}</div>

                          }

                          </AdminContext.Provider>
                        </ActivePageContext.Provider>
                      </paramSectionContext.Provider>
                    </BannerContext.Provider>
                  </LoadingIconContext.Provider>
              {/* </SideBarContext.Provider> */}
            </ThemeContext.Provider>
          </activeLanguageContext.Provider>
        </LanguageSelectorContext.Provider>
    </CompanyInformationContext.Provider>

  );
  
};

export default App;
