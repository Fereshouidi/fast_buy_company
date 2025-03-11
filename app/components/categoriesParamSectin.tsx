'use client';

import { faExchangeAlt, faPen, faPlus, faSquarePlus, faTag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCategorie, deleteCategorieById, renameCategorieById, aplyDiscountCodeOnCategories, undoDiscountCodeOnCategories } from "../crud";
import { act, CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { activeLanguageContext } from "../contexts/activeLanguage";
import { CategorieParams } from "../contexts/categories";
import { BannerContext } from "../contexts/bannerForEverything";
import { nameParams } from "../contexts/companyInformation";
import english from '@/app/languages/english.json';
import { LoadingIconContext } from "../contexts/loadingIcon";

type params = {
    activeCategorie?: CategorieParams ;
    setActiveCategorie?: (value: CategorieParams) => void;
    allCategories?: CategorieParams[] | undefined
    setAllCategories?: (value: CategorieParams[]) => void;
    refresh?: boolean
    setRefresh?: (value: boolean) => void
    importFom: 'companyManagementPage' | 'productManagementPage'
    categoriesInHomePage?: CategorieParams[]
    setCategoriesInHomePage?: (value: CategorieParams[]) => void
    changeHappen?: boolean 
    setChangeHappen?: (value: boolean) => void
}
const CategoriesParapsSection = ({activeCategorie, setActiveCategorie, allCategories, setAllCategories, refresh, setRefresh, importFom, categoriesInHomePage, setCategoriesInHomePage, changeHappen, setChangeHappen}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
    const [isInputForAddActive, setIsInputForAddActive] = useState<boolean>(false);
    const [isInputForRenameActive, setIsInputForRenameActive] = useState<boolean>(false);
    const [rename, setRename] = useState<nameParams>({english: '', arabic: ''});
    const [discountCode, setDiscountCode] = useState<string>('');
    const [newCategorie, setNewCategorie] = useState<CategorieParams |undefined>(undefined);
    // const [discountCode, setDiscountCode] = useState<CategorieParams |undefined>(undefined);
    const [isInputsForMoveActive, setIsInputsForMoveActive] = useState<boolean>(false);
    const [isInputsForDeleteActive, setIsInputsForDeleteActive] = useState<boolean>(false);
    const [isInputsForDiscoutCodeActive, setIsInputsForDiscoutCodeActivee] = useState<boolean>(false);
    const setBannerexist = useContext(BannerContext)?.setBanner;
    const SetLoadingIcon = useContext(LoadingIconContext)?.setExist;
    // const discountCodeInputRef = useRef(null);

    useEffect(() => {
        setDiscountCode(activeCategorie?.discountCode?._id?? '');
    }, [activeCategorie])

    const handlerenameClick = () => {
        if (activeCategorie) {
            setIsInputForAddActive(false);
            setIsInputsForMoveActive(false);
            setIsInputsForDeleteActive(false);
            setIsInputsForDiscoutCodeActivee(false);
            setIsInputForRenameActive(!isInputForRenameActive);
        } else {
            setBannerexist(true, 'choise categorie first !')
        }        
    }
    const handleAddClick = () => {
        if (activeCategorie) {
            setIsInputForRenameActive(false);
            setIsInputsForMoveActive(false);
            setIsInputsForDeleteActive(false);
            setIsInputsForDiscoutCodeActivee(false);
            setIsInputForAddActive(!isInputForAddActive);
        } else {
            setBannerexist(true, 'choise categorie first !')
        }        
    }
    const handleRemoveClick = () => {
        if (activeCategorie) {
            setIsInputForRenameActive(false);
            setIsInputForAddActive(false);
            setIsInputsForMoveActive(false);
            setIsInputsForDeleteActive(!isInputsForDeleteActive);
            setIsInputsForDiscoutCodeActivee(false);
        } else {
            setBannerexist(true, 'choise categorie first !')
        }        
    }
    const handleAddToHomePageClick = () => {
        SetLoadingIcon(true);
        if (activeCategorie && categoriesInHomePage) {
            
            const isAlreadyExist = categoriesInHomePage.some(categorieSelect => categorieSelect._id == activeCategorie._id);
            if (isAlreadyExist || !activeCategorie.parentCategorie) {
                setCategoriesInHomePage(categoriesInHomePage.filter(categorie_ => categorie_._id !== activeCategorie._id));
            } else {
                setCategoriesInHomePage([...categoriesInHomePage, activeCategorie]);
            }

            setChangeHappen(true);
            setActiveCategorie(undefined);
            setIsInputForRenameActive(false);
            setIsInputForAddActive(false);
            setIsInputsForMoveActive(false);
            setIsInputsForDeleteActive(false);
            setIsInputsForDiscoutCodeActivee(false);
            
        } else {
            setBannerexist(true, activeLanguage?.choiseCategorieFirst)
        }        
        SetLoadingIcon(false);
    }
    const handleDiscountClick = () => {
        if (activeCategorie) {
            setIsInputForRenameActive(false);
            setIsInputForAddActive(false);
            setIsInputsForMoveActive(false);
            setIsInputsForDeleteActive(false);
            setIsInputsForDiscoutCodeActivee(!isInputsForDiscoutCodeActive);
        } else {
            setBannerexist(true, 'choise categorie first !')
        }        
    }

    const handlerenameChange = (event: React.ChangeEvent<HTMLInputElement>, language: 'arabic'|'english') => {
        if (language == 'english') {
            setRename({...rename, english: event.target.value})
        } else if (language == 'arabic') {
            setRename({...rename, arabic: event.target.value})
        }
    }

    const handleNewCategorieName = (event: React.ChangeEvent<HTMLInputElement>, language: 'arabic'|'english') => {
        if (language == 'english') {
            setNewCategorie({
                ...newCategorie, 
                name: {...newCategorie.name, english: event.target.value}
            })
        } else if (language == 'arabic') {
            setNewCategorie({
                ...newCategorie, 
                name: {...newCategorie.name, arabic: event.target.value}
            })
        }        
    }

    const handleDiscountCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setDiscountCode(event.target?.value);
        }
    }

    const handleAplyDicoutCodeClicked = async () => {     
        SetLoadingIcon(true);
        const done = await aplyDiscountCodeOnCategories(activeCategorie?._id, discountCode);
        if (done) {
            setBannerexist(true, activeLanguage?.discountCodeAppliedSuccessfully, 'success');
            setActiveCategorie({...activeCategorie, discountCode: { _id: discountCode }});
            setAllCategories(allCategories?.map(categorie_ => 
                categorie_._id == activeCategorie?._id ? 
                    {...activeCategorie, discountCode: { _id: discountCode }} 
                    : categorie_
            ));

            } else {
            setBannerexist(true, activeLanguage?.someErrorHappen, 'fail');
        }
        SetLoadingIcon(false);
    }
    const handleUndoDicoutCodeClicked = async () => {     
        SetLoadingIcon(true);
        const done = await undoDiscountCodeOnCategories(activeCategorie?._id, discountCode);
        if (done) {
            setBannerexist(true, 'done', 'success');
            setActiveCategorie({...activeCategorie, discountCode: undefined});
            setAllCategories(allCategories?.map(categorie_ => 
                categorie_._id == activeCategorie?._id ? 
                {...activeCategorie, discountCode: { _id: discountCode }}
                : categorie_
            ));
            
        } else {
            setBannerexist(true, activeLanguage?.someErrorHappen, 'fail');
        }
        SetLoadingIcon(false);
    }

    const handleDelete = async() => {
        const isDone = await deleteCategorieById(activeCategorie?._id);
        if (isDone) {
            const updatedAllCategorie = allCategories.filter((categorie) => {
                if (categorie._id != activeCategorie?._id) {
                    return categorie
                }
            })
            setAllCategories(updatedAllCategorie)
            setBannerexist(true, activeLanguage?.categoryDelitedSuccessfuly, 'success')
        } else {
            setBannerexist(true, activeLanguage?.someErrorHappen, 'success')
        }
    }

    useEffect(() => {
        setNewCategorie({
            name: {english: '', arabic: ''},
            parentCategorie: activeCategorie?._id
        })
        console.log(activeCategorie?._id);
        
    }, [activeCategorie])

    useEffect(() => {
        console.log(rename);
        setRename(activeCategorie?.name);
    }, [activeCategorie])

    const renameConfirm = async() => {
        const updatingCategorie = await renameCategorieById(activeCategorie?._id, rename);
        setActiveCategorie({...activeCategorie, name: rename});

        const updatedCategories = allCategories?.map(category => {
            return category?._id === updatingCategorie?._id ? { ...category, name: rename, margin: category.margin } : category
        });

        if (typeof updatedCategories == typeof allCategories) {
            setAllCategories(updatedCategories);
        }        
        setBannerexist(true, activeLanguage?.nameUpdatedSuccessfully, "success");
    }

    const handleAddCategorie = async( ) => {
        const newCategorie_ = await addCategorie(newCategorie.name, newCategorie.parentCategorie);

        const updatedCategories = allCategories?.map(category => {
            return category?._id === newCategorie.parentCategorie 
                ? { ...category, childrenCategories: [...category.childrenCategories, newCategorie_._id], childOpen: false } 
                : category;
        });
        

        if (typeof updatedCategories == typeof allCategories) {
            setRefresh(true)
            setAllCategories(updatedCategories);
        }   


        if (newCategorie_) {
            setBannerexist(true, activeLanguage?.categorieAddedSuccessfully, 'success');
        } else {
            setBannerexist(true, activeLanguage?.someErrorHappen, 'fail');
        }
    }
    
    const styleConfirmBTN: CSSProperties = {
        right: activeLanguage?.language == 'arabic' ? '' : '0',
        left: activeLanguage?.language == 'arabic' ? '0' : '',
        borderRadius: activeLanguage?.language == 'arabic' ? '50px 0 0 50px' : '0 50px 50px 0'
    }

    const styleAddInput: CSSProperties = {
        margin: 'var(--extra-small-margin)'
    }
    
    return (
        <div id={'categories-param-sectin'}>
            
            <div className="categorie-id">
                <h4>{activeLanguage?.categorieIDW}</h4>
                <p>{activeCategorie?._id?? '...'}</p>
            </div>

            <div id="edit-section">

                <div id="add" className="item" onClick={handleAddClick}>
                    <FontAwesomeIcon className="icon" icon={faPlus}/>
                    <h6>{activeLanguage?.addW}</h6>
                </div>
                <div id="rename" className="item" onClick={handlerenameClick}>
                    <FontAwesomeIcon className="icon" icon={faPen}/>
                    <h6>{activeLanguage?.renameW}</h6>
                </div>
                <div id="remove" className="item" onClick={handleRemoveClick}>
                    <FontAwesomeIcon className="icon" icon={faTrash}/>
                    <h6>{activeLanguage?.removeW}</h6>
                </div>
                <div id="discount-code" className="item" onClick={handleDiscountClick}>
                    <FontAwesomeIcon className="icon" icon={faTag}/>
                    <h6>{activeLanguage?.discountCodeW}</h6>
                </div>
                {importFom == 'companyManagementPage' && <div id="addToHomePage" className="item" onClick={handleAddToHomePageClick}>
                    <FontAwesomeIcon className="icon" icon={faSquarePlus}/>
                    <h6>home page</h6>
                </div>}
                
            </div>


            {isInputForAddActive && <div className="input-div">
                <input style={styleAddInput} type="text" onChange={(e) => handleNewCategorieName(e, 'english')} placeholder={' new categorie name ... '} /> 
                <input style={styleAddInput} type="text" onChange={(e) => handleNewCategorieName(e, 'arabic')} placeholder={' اسم الصنف الجديد ... '}/> 
                <h4 id="confirm-btn-for-addName" onClick={() => handleAddCategorie()}>{activeLanguage?.confirmW}</h4>
            </div>}

            {isInputForRenameActive && <div className="input-div">
                <div className="container">
                    <input type="text" onChange={(e) => handlerenameChange(e, 'english')} value={rename?.english?? ''}/> 
                    <h4 className="confirm-btn-for-rename" style={styleConfirmBTN} onClick={renameConfirm} >{activeLanguage?.confirmW}</h4>
                </div>
                <div className="container">
                    <input type="text" onChange={(e) => handlerenameChange(e, 'arabic')} value={rename?.arabic ?? ''}/> 
                    <h4 className="confirm-btn-for-rename" style={styleConfirmBTN} onClick={renameConfirm} >{activeLanguage?.confirmW}</h4>
                </div>
            </div>}

            {isInputsForMoveActive && <div className="input-div">
                <input type="text" placeholder={activeLanguage?.moveTo + ' ... '} /> 
                <h4 className="confirm-btn" style={styleConfirmBTN}>{activeLanguage?.confirmW}</h4>
            </div>}

            {isInputsForDeleteActive && <div className="input-div-for-delete">
                <h4 id="confirm-btn-for-delete" onClick={handleDelete}>{activeLanguage?.confirmW}</h4>
            </div>}

            {isInputsForDiscoutCodeActive && <div className="input-div input-discount-code">
                <input type="text" value={activeCategorie?.discountCode? activeCategorie.discountCode._id : ''} onChange={(e) => handleDiscountCodeChange(e)} placeholder={activeLanguage?.discountCodeId + ' ... '} /> 
                <h4 className={activeCategorie?.discountCode ? "invisible" : "confirm-btn"} onClick={handleAplyDicoutCodeClicked} style={styleConfirmBTN}>{activeLanguage?.confirmW}</h4>
                <div className="handling-div">
                    <h5 className={activeCategorie?.discountCode ? "handle-btn-while-discount-code-exist cancel-btn" : "invisible"} onClick={handleUndoDicoutCodeClicked}>{activeLanguage?.cancelW}</h5>
                    <h5 className={activeCategorie?.discountCode ? "handle-btn-while-discount-code-exist confirm-update-btn" : "invisible"} onClick={handleAplyDicoutCodeClicked}>{activeLanguage?.confirmW}</h5>
                </div>
            </div>}

        </div>
    )
}
export default CategoriesParapsSection;

