'use client';

import { faCheck, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllDiscountCodes, updateAllDiscountCodes } from "@/app/crud";
import { use, useContext, useEffect, useState } from "react";
import { discountCodeParams } from "@/app/contexts/discountCode";
import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import './style.css';
import AddDiscountCode from "./addDiscountCode";
import { deleteDiscountCodeById } from "@/app/crud";
import { BannerContext } from "@/app/contexts/bannerForEverything";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    importFrom: 'productManagementPage' | 'companyManagementPage'
    allDiscountCodes: discountCodeParams[] 
    setAllDiscountCodes: (value: discountCodeParams[] | ((prev: discountCodeParams[]) => discountCodeParams[])) => void
}
const DiscountCodeSection = ({exist, setExist, importFrom, allDiscountCodes, setAllDiscountCodes}: params) => {

    const activeLanguage = use(activeLanguageContext)?.activeLanguage;
    const [discountSelected, setDiscountSelected] = useState<discountCodeParams | null>(null);
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const [addDiscountCodeSecExist, setAddDiscountCodeSecExist] = useState<boolean>(false);
    const setBanner = useContext(BannerContext)?.setBanner;


    //     const fetchData = async () => {
    //         const discountCodes = await getAllDiscountCodes();
    //         setAllDiscountCodes(discountCodes);
    //     }
    //     fetchData();
    // }, []);

    const handleTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAllDiscountCodes((prev) => {
            return prev?.map(discountCode => {
                if (discountCode._id == discountSelected?._id) {
                    return {
                        ...discountCode,
                        target: e.target.value as "shoppingCart" | "product" | "categorie"
                    }
                } else {
                    return discountCode;
                }
            })
        })
        setChangeHappen(true);
    }
    const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllDiscountCodes((prev) => {
            return prev?.map(discountCode => {
                if (discountCode._id == discountSelected?._id) {
                    return {
                        ...discountCode,
                        code: e.target.value 
                    }
                } else {
                    return discountCode;
                }
            })
        })
        setChangeHappen(true);
    }
    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setAllDiscountCodes((prev) => {
            return prev?.map(discountCode => {
                if (discountCode._id == discountSelected?._id) {
                    if (e.target.value == 'percentage') {
                        return {
                            ...discountCode,
                            discount: null,
                            discountPercent: 0
                        }
                    } else {
                        return {
                            ...discountCode,
                            discountPercent: null,
                            discount: 0
                        }
                    }
                } else {
                    return discountCode;
                }
            })
        })
        setChangeHappen(true);

    }
    const handleDiscountPercent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllDiscountCodes((prev) => {
            return prev?.map(discountCode => {
                if (discountCode._id == discountSelected?._id) {
                    return {
                        ...discountCode,
                        discountPercent: Number(e.target.value) 
                    }
                } else {
                    return discountCode;
                }
            })
        })
        setChangeHappen(true);
    }
    const handleDiscountAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllDiscountCodes((prev) => {
            return prev?.map(discountCode => {
                if (discountCode._id == discountSelected?._id) {
                    return {
                        ...discountCode,
                        discount: Number(e.target.value) 
                    }
                } else {
                    return discountCode;
                }
            })
        })
        setChangeHappen(true);
    }
    const handleNumOfUse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllDiscountCodes((prev) => {
            return prev?.map(discountCode => {
                if (discountCode._id == discountSelected?._id) {
                    return {
                        ...discountCode,
                        numOfUse: Number(e.target.value) 
                    }
                } else {
                    return discountCode;
                }
            })
        })
        setChangeHappen(true);
    }

    const HandleDeleteBtn = async () => {
        setLoadingIcon(true);
        const isDone = await deleteDiscountCodeById(discountSelected?._id);
        if (isDone) {
            setAllDiscountCodes(prev => {
                return prev?.filter(discountCode => discountCode._id != discountSelected?._id)
            });
            setChangeHappen(false);
            setBanner(true, 'deleted successfully', 'success');
        } else {
            setBanner(true, activeLanguage?.someErrorHappen, 'fail');
        }
        setLoadingIcon(false);
    }

    const done = async () => {
        setLoadingIcon(true);
        const updatedAllProducts = await updateAllDiscountCodes(allDiscountCodes);
        if (updatedAllProducts) {
            setAllDiscountCodes(updatedAllProducts);
            setChangeHappen(false);
            setBanner(true, 'done', 'success');
        } else {
            setBanner(true, activeLanguage?.someErrorHappen, 'fail');
        }
        setLoadingIcon(false);
    }


    useEffect(() => {
        console.log(allDiscountCodes);
    }, [allDiscountCodes])

    return (
        <div className={exist? 'discount-code-container-section scroll' : 'invisible'}>
            
            <div id="discount-code-section">

                <header className="header"> 
                    <div className="handling">
                        <div className="handling-item" onClick={() => setAddDiscountCodeSecExist(true)}>
                            {activeLanguage?.addW}
                                <FontAwesomeIcon 
                                icon={faPlus} 
                                className="add-icon"
                            />
                        </div>
                        <div className="handling-item" 
                            style={{
                                backgroundColor: discountSelected? 'red' : '',
                                color: discountSelected? 'white' : ''
                            }}
                            onClick={HandleDeleteBtn}
                        >
                            {activeLanguage?.deleteW}
                                <FontAwesomeIcon 
                                icon={faTrash} 
                                className="delete-icon"
                            />
                        </div>
                        <div className="handling-item" 
                            style={{
                                backgroundColor: changeHappen? 'green' : '',
                                color: changeHappen? 'white' : ''
                            }}
                            onClick={done}
                        >
                            {activeLanguage?.doneW}
                                <FontAwesomeIcon 
                                icon={faCheck} 
                                className="done-icon"
                            />
                        </div>
             
                    </div>

                    <h4>{activeLanguage?.discountCodesW}</h4>

                    <div className="cancel_" onClick={() => setExist(false)}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>

                <section id="discounts-management-section" className="scroll">
                    {allDiscountCodes?.map((discountCode, index) => {
                        return <div key={index} 
                                className="card" 
                                onClick={() => setDiscountSelected(discountCode)}
                                style={{border: discountSelected? discountSelected._id == discountCode._id ? '2px solid var(--primary-color)' : '1px solid var(--ashen)' : '1px solid var(--ashen)'}}
                            >

                            <div className="item id">
                                <strong>{activeLanguage?.idW} : </strong>
                                <p className="id">{discountCode._id}</p>
                            </div>

                            <div className="item">
                                <strong>{activeLanguage?.codeW} : </strong>
                                <input 
                                    className=""
                                    value={discountCode.code?? null}
                                    onChange={(e) => handleCode(e)}
                                />
                            </div>

                            <div className="item">
                                <strong>{activeLanguage?.targetW} : </strong>
                                <select 
                                    className=""
                                    value={discountCode.target && typeof discountCode.target == 'string' ? discountCode.target : importFrom == 'companyManagementPage'? 'shoppingCart' : 'products'}
                                    onChange={(e) => handleTarget(e)}
                                >
                                    {importFrom == 'companyManagementPage' && <option value="shoppingCart">{activeLanguage?.shoppingCartsW}</option>}
                                    <option value="product">{activeLanguage?.productsW}</option>
                                    <option value="categorie">{activeLanguage?.categoriesW}</option>
                                </select>
                            </div>

                            
                            <div className="item">
                                <strong>{activeLanguage?.typeW} : </strong>
                                <select 
                                    className=""
                                    defaultValue={discountCode.discount != null ? 'amunt' : 'percentage'}
                                    onChange={(e) => handleType(e)}
                                >
                                    <option value="amunt">{activeLanguage?.amountW}</option>
                                    <option value="percentage">{activeLanguage?.percentageW}</option>
                                </select>
                            </div>

                            {discountCode.discountPercent != null && <div className="item">
                                <strong>{activeLanguage?.percentageW} : </strong>
                                <input 
                                    type="number"
                                    className=""
                                    defaultValue={discountCode.discountPercent?? 0}
                                    onChange={(e) => handleDiscountPercent(e)}
                                />
                            </div>}

                            {discountCode.discount != null && <div className="item">
                                <strong>{activeLanguage?.amountW} : </strong>
                                <input 
                                    type="number"
                                    className=""
                                    defaultValue={discountCode.discount?? 0}
                                    onChange={(e) => handleDiscountAmount(e)}
                                />
                            </div>}

                            <div className="item">
                                <strong>{activeLanguage?.numOfUseW} : </strong>
                                <input 
                                    type="number"
                                    className=""
                                    defaultValue={discountCode.numOfUse?? 0}
                                    onChange={(e) => handleNumOfUse(e)}
                                />
                            </div>
                        </div>
                    })}
                </section>
            </div>

            <AddDiscountCode exist={addDiscountCodeSecExist} setExist={setAddDiscountCodeSecExist} importFrom={importFrom} allDiscountCodes={allDiscountCodes} setAllDiscountCodes={setAllDiscountCodes}/>
        </div>
    )
}
export default DiscountCodeSection;