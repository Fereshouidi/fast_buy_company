'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { faPlus, faTrash, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import CategorieSelector from "./categoriesSelector";
import CategoriesParapsSection from "@/app/components/categoriesParamSectin";
import { CategorieParams } from "@/app/contexts/categories";
import { getCategoriesSection_, updateCategoriesSection } from "@/app/crud";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";


type parmas = {
    exist: boolean
    setExist: (value: boolean) => void
}
const CategoriesSection = ({exist, setExist}: parmas) => {
    
    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const primaryColor = useContext(CompanyInformationContext)?.primaryColor;
    const [addProductToSliderSectionExist, setAddProductToSliderSectionExist] = useState<boolean>(false);
    const [activeCategorie, setActiveCategorie] = useState<CategorieParams | undefined>(undefined);
    // const [categoriesSelected, setCategoriesSelected] = useState<CategorieParams[]>([]);
    const [categoriesInHomePage, setCategoriesInHomePage] = useState<CategorieParams[]>([]);
    const setBannerexist = useContext(BannerContext)?.setBanner;
    const SetLoadingIcon = useContext(LoadingIconContext)?.setExist;

    useEffect(() => {
        const fetchData = async () => {
            const categories = await getCategoriesSection_();
            setCategoriesInHomePage(categories);
        }
        fetchData();
    }, [])
    
    const handleExit = (e: React.MouseEvent<HTMLDivElement>) => {
        setExist(false);
    }

    const handleDone = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (changeHappen) {
            SetLoadingIcon(true);

            const done = await updateCategoriesSection(categoriesInHomePage);
            
            if (done?.status == 200) {
                setBannerexist(true, activeLanguage?.categoriesSectionUpdatedSuccessfully);
            } else {
                setBannerexist(true, activeLanguage?.someErrorHappen);
            }

            setChangeHappen(false);
            setExist(false);
            SetLoadingIcon(false);
        }
    }

    return (
        <div className={exist ? 'section-container categories-container-section' : 'invisible'} onClick={(e) => handleExit(e)}>

            <div id="categories-section">

                <header className="header"> 
                    <div className="handling">

                        <div className="handling-item" 
                            style={{
                                backgroundColor: changeHappen? 'green' : '',
                                color: changeHappen? 'white' : ''
                            }}
                            onClick={(e) => handleDone(e)}
                        >
                            {activeLanguage?.doneW}
                                <FontAwesomeIcon 
                                icon={faCheck} 
                                className="done-icon"
                            />
                        </div>
                
                    </div>

                    <h4>{activeLanguage?.categoriesW}</h4>

                    <div className="cancel_" onClick={handleExit}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>

                <section id="categories-management-section" className="scroll">
                    <CategorieSelector 
                        activeCategorie={activeCategorie} 
                        setActiveCategorie={setActiveCategorie} 
                        categoriesInHomePage={categoriesInHomePage} 
                        setCategoriesInHomePage={setCategoriesInHomePage}
                        changeHappen={changeHappen} 
                        setChangeHappen={setChangeHappen}
                    />

                </section>


            </div>
            
        

        </div>
    )
}
export default CategoriesSection;