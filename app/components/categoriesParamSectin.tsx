'use client';

import { faExchangeAlt, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCategorie, deleteCategorieById, renameCategorieById } from "../crud";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { ActiveLanguageContext } from "../contexts/activeLanguage";
import { CategorieParams } from "../contexts/categories";
import { BannerContext } from "../contexts/bannerForEverything";
import { nameParams } from "../contexts/companyInformation";

type params = {
    activeCategorie: CategorieParams ;
    setActiveCategorie: (value: CategorieParams) => void;
    allCategories: CategorieParams[] | undefined
    setAllCategories: (value: CategorieParams[]) => void;
    refresh: boolean
    setRefresh: (value: boolean) => void
}
const CategoriesParapsSection = ({activeCategorie, setActiveCategorie, allCategories, setAllCategories, refresh, setRefresh}: params) => {

    const activeLanguage = useContext(ActiveLanguageContext).activeLanguage;
    const [isInputForAddActive, setIsInputForAddActive] = useState<boolean>(false);
    const [isInputForRenameActive, setIsInputForRenameActive] = useState<boolean>(false);
    const [rename, setRename] = useState<nameParams>({english: '', arabic: ''});
    const [newCategorie, setNewCategorie] = useState<CategorieParams |undefined>(undefined);
    const [isInputsForMoveActive, setIsInputsForMoveActive] = useState<boolean>(false);
    const [isInputsForDeleteActive, setIsInputsForDeleteActive] = useState<boolean>(false);
    const setBannerexist = useContext(BannerContext).setBanner;

    const handlerenameClick = () => {
        if (activeCategorie) {
            setIsInputForAddActive(false);
            setIsInputsForMoveActive(false);
            setIsInputsForDeleteActive(false);
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
        setBannerexist(true, activeLanguage.nameUpdatedSuccessfully, "success");
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
            setBannerexist(true, activeLanguage.categorieAddedSuccessfully, 'success');
        } else {
            setBannerexist(true, activeLanguage.someErrorHappen, 'fail');
        }
    }

    const styleConfirmBTN: CSSProperties = {
        right: activeLanguage.language == 'arabic' ? '' : '0',
        left: activeLanguage.language == 'arabic' ? '0' : '',
        borderRadius: activeLanguage.language == 'arabic' ? '50px 0 0 50px' : '0 50px 50px 0'
    }

    const styleAddInput: CSSProperties = {
        margin: 'var(--extra-small-margin)'
    }
    
    return (
        <div id={'categories-param-sectin'}>
            
            <div className="categorie-id">
                <h4>{activeLanguage.categorieIDW}</h4>
                <p>{activeCategorie?._id?? '...'}</p>
            </div>

            <div id="edit-section">

                <div id="add" className="item" onClick={handleAddClick}>
                    <FontAwesomeIcon className="icon" icon={faPlus}/>
                    <h6>{activeLanguage?.addW}</h6>
                </div>
                <div id="rename" className="item" onClick={handlerenameClick}>
                    <FontAwesomeIcon className="icon" icon={faPen}/>
                    <h6>{activeLanguage.renameW}</h6>
                </div>
                <div id="move" className="item">
                    <FontAwesomeIcon className="icon" icon={faExchangeAlt}/>
                    <h6>{activeLanguage.moveW}</h6>
                </div>
                <div id="remove" className="item" onClick={handleRemoveClick}>
                    <FontAwesomeIcon className="icon" icon={faTrash}/>
                    <h6>{activeLanguage.removeW}</h6>
                </div>
            </div>


            {isInputForAddActive && <div className="input-div">
                <input style={styleAddInput} type="text" onChange={(e) => handleNewCategorieName(e, 'english')} placeholder={' new categorie name ... '} /> 
                <input style={styleAddInput} type="text" onChange={(e) => handleNewCategorieName(e, 'arabic')} placeholder={' اسم الصنف الجديد ... '}/> 
                <h4 id="confirm-btn-for-addName" onClick={() => handleAddCategorie()}>{activeLanguage.confirmW}</h4>
            </div>}

            {isInputForRenameActive && <div className="input-div">
                <div className="container">
                    <input type="text" onChange={(e) => handlerenameChange(e, 'english')} value={rename?.english}/> 
                    <h4 className="confirm-btn-for-rename" style={styleConfirmBTN} onClick={renameConfirm} >{activeLanguage.confirmW}</h4>
                </div>
                <div className="container">
                    <input type="text" onChange={(e) => handlerenameChange(e, 'arabic')} value={rename?.arabic}/> 
                    <h4 className="confirm-btn-for-rename" style={styleConfirmBTN} onClick={renameConfirm} >{activeLanguage.confirmW}</h4>
                </div>
            </div>}

            {isInputsForMoveActive && <div className="input-div">
                <input type="text" placeholder={activeLanguage.moveTo + ' ... '} /> 
                <h4 className="confirm-btn" style={styleConfirmBTN}>{activeLanguage.confirmW}</h4>
            </div>}

            {isInputsForDeleteActive && <div className="input-div-for-delete">
                <h4 id="confirm-btn-for-delete" onClick={handleDelete}>{activeLanguage.confirmW}</h4>
            </div>}

        </div>
    )
}
export default CategoriesParapsSection;