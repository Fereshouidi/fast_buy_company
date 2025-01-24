'use client';
import { CSSProperties, useContext, useEffect, useState } from "react";
import { LanguageSelectorContext } from "@/app/contexts/LanguageSelectorContext";
// import { SideBarContext } from "@/app/contexts/SideBarContext";
import { getAllCategorie, getCategoriesByParent } from "@/app/crud";
import './categorieSelector.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMinus, } from "@fortawesome/free-solid-svg-icons";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { useRouter } from "next/navigation";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { CategorieParams } from "../contexts/categories";
import CategoriesParapsSection from "./categoriesParamSectin";

type params = {
    activeCategorie: CategorieParams | undefined,
    setActiveCategorie: (value: CategorieParams) => void
}
const CategorieSelector = ({activeCategorie, setActiveCategorie}: params) => {

    const [isHover, setIsHover] = useState<boolean>(false)
    const companyInformation = useContext(CompanyInformationContext);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const router = useRouter();
    const languageSelectorContext = useContext(LanguageSelectorContext);
    const [allCategories, setAllCategories] = useState<CategorieParams[]>([]);
    const [categorieClicked, setCategorieClicked] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);


    
    // const sideBarContext = useContext(SideBarContext);
    // if (!sideBarContext) {
    //     throw new Error("SideBarContext must be used within a SideBarContext.Provider");
    // }

    // if(!allCategories || !sideBarContext || !languageSelectorContext || !setLoadingIcon){
    //     throw 'context error !'
    // }
    
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
    if (categorie.childrenCategories.length > 0) {
        if (!categorie.childOpen) {
            const otherCategories = await getCategoriesByParent(categorie._id);
            otherCategories.forEach((categorieChild: CategorieParams) => {
                categorieChild.margin = categorie.margin + 10; 
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

const getProductFromCategorie = (categorie: CategorieParams) => {
    setActiveCategorie(categorie)
    return handleClick(categorie)
}


const styleContainerAll: CSSProperties = {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    minWidth: 'calc(var(--long-width) + 10px)',
    width: 'calc(var(--extra-long-width) /1.3)',
    height: 'auto',
    minHeight: 'var(--primary-height)',
    padding: 0,
    zIndex: 800,
    // backgroundColor: 'red'
}
const style: CSSProperties = {
    display: 'flex',
    alignItems: 'start',
    width: '100%',
    height: 'auto',
    minHeight: 'var(--primary-height)',
    padding: 0,
    overflow: 'scroll',
}
const styleDiv: CSSProperties = {
    minHeight: 'var(--primary-height)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    width: '100%'
}
const styleChildren: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    borderBottom: 'var(--slim-border)',
    height: 'var(--primary-height)',
    // zIndex: 980,
    padding: '0 0px',
    width: '100%',
    position: 'relative',

}
const styleDownIcon: CSSProperties = {
    backgroundColor: 'transparent',
    color: 'var(--black)',
    width: 'var(--short-width)',
    height: 'var(--short-width)',
    padding: '10px',
    right: languageSelectorContext.activeLanguage == "arabic" ? '' : '5px',
    left: languageSelectorContext.activeLanguage == "arabic" ? '5px' : "",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    fontSize: 'var(--small-size)',
    // zIndex: 0,
    cursor: 'pointer'
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
    <div style={styleContainerAll}>

        <CategoriesParapsSection activeCategorie={activeCategorie} setActiveCategorie={setActiveCategorie} allCategories={allCategories} setAllCategories={setAllCategories} refresh={refresh} setRefresh={setRefresh} />

        <li className="scrollDiv" style={isHover? styleHover : style}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        >

            <div style={isHover? styleDivHover : styleDiv}>{
                allCategories.map((categorie, index) => {
                    return (
                    <ul key={index} style={isHover? styleChildrenHover : styleChildren}  >
                        <ul style={languageSelectorContext.activeLanguage == 'arabic' ? { paddingRight: `${categorie.margin}px`, backgroundColor: activeCategorie?._id == categorie._id? companyInformation.primaryColor : null } : {paddingLeft: `${categorie.margin}px`, backgroundColor: activeCategorie?._id == categorie._id? companyInformation.primaryColor : null }} className={categorie.parentCategorie? "child" : categorieClicked? "parent-clicked": "parent"} key={categorie._id} onClick={() => getProductFromCategorie(categorie)} >{languageSelectorContext.activeLanguage == 'arabic' ? categorie.name.arabic : languageSelectorContext.activeLanguage == 'english' ? categorie.name.english : categorie.name.english}</ul>
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