'use client';
import { CSSProperties, useContext, useEffect, useState } from "react";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
import { getAllCategorie, getCategoriesByParent } from "@/app/crud";
// import "@/app/components/categoriesSelector.css";
// import "@/app/components/categoriesSelector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMinus, } from "@fortawesome/free-solid-svg-icons";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { useRouter } from "next/navigation";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import english from '@/app/languages/english.json';
import { CategorieParams } from "@/app/contexts/categories";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import CategoriesParapsSection from "@/app/components/categoriesParamSectin";

type params = {
    activeCategorie?: CategorieParams | undefined,
    setActiveCategorie?: (value: CategorieParams) => void
    categoriesSelected?: CategorieParams[]
    setCategoriesSelected?: (value: CategorieParams[]) => void
    categoriesInHomePage: CategorieParams[]
    setCategoriesInHomePage: (value: CategorieParams[]) => void
    changeHappen: boolean 
    setChangeHappen: (value: boolean) => void
}
const CategorieSelector = ({activeCategorie, setActiveCategorie, categoriesInHomePage, setCategoriesInHomePage, changeHappen, setChangeHappen}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
    const [isHover, setIsHover] = useState<boolean>(false)
    const companyInformation = useContext(CompanyInformationContext);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const router = useRouter();
    const languageSelectorContext = useContext(LanguageSelectorContext);
    const [allCategories, setAllCategories] = useState<CategorieParams[]>([]);
    const [categorieClicked, setCategorieClicked] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);


    useEffect(() => {
        if (activeCategorie && refresh) {
            setActiveCategorie({...activeCategorie, childOpen: false})
            handleClick(activeCategorie);
            setRefresh(false);
            console.log('refresh done', allCategories);
            
        }
    }, [refresh])

    useEffect(() => {
        const fetchData = async() => {
            const data = await getAllCategorie();
            await data.forEach((categorie: CategorieParams) => {
                categorie.margin = categorie.margin + 10;
            });
            setAllCategories(data)
        }
        fetchData()
    }, [])

    const parent = allCategories.filter(categorie => {                
        if (!categorie.parentCategorie) {
            return categorie;
        }
    })[0]

    const [done, setDone] = useState<boolean>(false);
    useEffect(() => {

        if (parent && !parent.childOpen && !done) {
            handleClick(parent);
            parent.childOpen = true;
            setDone(true)

        }
    }, [parent])

    const handleCategorieSelectorClicked = (categorie: CategorieParams) => {
        if(!categorie.parentCategorie){
            setCategorieClicked((prev) => !prev)
        }
    }

    const getAllChildrenIds = (parent: CategorieParams, categories: CategorieParams[]): string[] => {
        const children = categories.filter((item) => item.parentCategorie === parent._id);
        let allIds = children.map((child) => child._id);

        children.forEach((child) => {
            allIds = [...allIds, ...getAllChildrenIds(child, categories)];
        });

        return allIds
    };


    const handleClick = async (categorie: CategorieParams) => {
        // e.stopPropagation();

        if (categorie.childrenCategories.length > 0) {
            if (!categorie.childOpen) {
                const otherCategories = await getCategoriesByParent(categorie._id);
                otherCategories.forEach((categorieChild: CategorieParams) => {
                    categorieChild.margin = categorie.margin + 20; 
                });
                setAllCategories((prev) => {
                    const targetIndex = prev.findIndex((item) => item._id === categorie._id);
                    if (targetIndex !== -1) {
                        return [
                            ...prev.slice(0, targetIndex + 1),
                            ...otherCategories,
                            ...prev.slice(targetIndex + 1),
                        ];
                    }
                    return [...prev, ...otherCategories];
                });
                categorie.childOpen = true;
            } else {
                    setAllCategories((prev) => {
                        const removeIds = getAllChildrenIds(categorie, prev);
                        return prev.filter((item) => !removeIds.includes(item._id));
                    });
                
                
                categorie.childOpen = false;
            }
        }
        handleCategorieSelectorClicked(categorie)
    };

    const handleCategorieClicked = (e: React.MouseEvent<HTMLElement>, categorie: CategorieParams) => {
        e.stopPropagation()
        setActiveCategorie(categorie)

        // const isAlreadyExist = categoriesInHomePage.some(categorieSelect => categorieSelect._id == categorie._id);
        // if (isAlreadyExist || !categorie.parentCategorie) {
        //     setCategoriesInHomePage(categoriesInHomePage.filter(categorie_ => categorie_._id !== categorie._id));
        // } else {
        //     setCategoriesInHomePage([...categoriesInHomePage, categorie]);
        // }

    }

    function hexToRGBA(hex, alpha = 0.2) {
        hex = hex.replace(/^#/, '');

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    function hexToDark(hex, alpha = 1, factor = 0.8) {
        hex = hex.replace(/^#/, '');

        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        r = Math.floor(r * factor);
        g = Math.floor(g * factor);
        b = Math.floor(b * factor);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }


const styleContainerAll: CSSProperties = {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    minWidth: 'calc(var(--long-width) + 10px)',
    width: '100%',
    height: '100%',
    minHeight: 'var(--primary-height)',
    padding: '5px',
    margin: 0,
    zIndex: 800,
    borderRadius: '20px',

    // backgroundColor: 'blue',

    // backgroundColor: 'red'
}
const style: CSSProperties = {
    display: 'flex',
    alignItems: 'start',
    width: '100%',
    height: 'ato',
    minHeight: 'var(--primary-height)',
    padding: '0 25px',
    margin: 0,
    borderRadius: '20px',

    // overflow: 'scroll',
    // backgroundColor: 'red',

}
const styleDiv: CSSProperties = {
    minHeight: 'var(--primary-height)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: '20px',

}
const styleChildren: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: 'var(--slim-border)',
    height: 'var(--primary-height)',
    // zIndex: 980,
    padding: '0',
    width: '100%',
    position: 'relative',
    // backgroundColor: 'transparent',
    borderRadius: '20px',

}
const styleChildrenSelected: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: 'var(--slim-border)',
    height: 'var(--primary-height)',
    // zIndex: 980,
    padding: '0',
    width: '100%',
    position: 'relative',
    // backgroundColor: 'transparent',
    borderRadius: '20px',
    backgroundColor: hexToRGBA(companyInformation?.primaryColor)
}
const styleDownIcon: CSSProperties = {
    color: 'var(--black)',
    width: 'var(--short-width)',
    height: 'var(--short-width)',
    padding: '10px',
    right: activeLanguage?.language == "arabic" ? '' : '5px',
    left: activeLanguage?.language == "arabic" ? '5px' : "",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    fontSize: 'var(--small-size)',
    // zIndex: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderRadius: '20px',

}
const styleHover: CSSProperties = {
    ...style,
}
const styleDivHover: CSSProperties = {
    ...styleDiv, 
}
const styleChildrenHover: CSSProperties = {
    ...styleChildren,
}

return(
    <div style={styleContainerAll} onClick={(e) => {e.stopPropagation(), setActiveCategorie(undefined)}}>

        <div className="categories-params-section-container" onClick={(e) => e.stopPropagation()}>
            <CategoriesParapsSection 
                activeCategorie={activeCategorie} 
                setActiveCategorie={setActiveCategorie} 
                allCategories={allCategories} 
                setAllCategories={setAllCategories} 
                refresh={refresh} 
                setRefresh={setRefresh} 
                importFom="companyManagementPage" 
                categoriesInHomePage={categoriesInHomePage} 
                setCategoriesInHomePage={setCategoriesInHomePage}
                changeHappen={changeHappen} 
                setChangeHappen={setChangeHappen}
            />
        </div>

        <li className="scroll-div scroll" style={isHover? styleHover : style}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >

            <div style={isHover? styleDivHover : styleDiv}>{
                allCategories.map((categorie, index) => {
                    return (
                    <ul key={index} 
                        style={
                            categoriesInHomePage.some(categorie_ => categorie_._id === categorie._id) 
                                ? styleChildrenSelected 
                                : styleChildren
                    }>
                        <ul
                            key={categorie._id}
                            className={
                                categorie.parentCategorie
                                ? "child"
                                : categorieClicked
                                ? "parent-clicked"
                                : "parent"
                            }
                            style={{
                                ...(activeLanguage?.language === "arabic"
                                ? { paddingRight: `${categorie.margin}px` }
                                : { paddingLeft: `${categorie.margin}px` }),
                                backgroundColor:
                                    activeCategorie?._id === categorie._id
                                        ? categoriesInHomePage.some(categorieSelect => categorieSelect._id == categorie._id) ? hexToDark(companyInformation?.primaryColor) : companyInformation?.primaryColor
                                        : "transparent",
                                borderRadius: '20px'
                            }}
                            onClick={(e) => handleCategorieClicked(e, categorie)}
                            >
                            {activeLanguage?.language === "arabic"
                                ? categorie.name?.arabic ?? ""
                                : categorie.name?.english ?? ""}
                        </ul>

                        {categorie.childrenCategories.length > 0 ? <FontAwesomeIcon onClick={() => handleClick(categorie)} style={styleDownIcon} icon={categorie.childOpen? faMinus : faChevronDown } /> : null}
                    </ul>
                )
                })
            }</div>
            
        </li>


    </div>
    
)
}
export default CategorieSelector;