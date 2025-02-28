'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { discountCodeParams } from "@/app/contexts/discountCode";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { addDiscountCode } from "@/app/crud";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useContext, useEffect, useState } from "react";

type params = {
    exist: boolean
    setExist: (value: boolean) => void
    importFrom: 'productManagementPage' | 'companyManagementPage'
    allDiscountCodes: discountCodeParams[] 
    setAllDiscountCodes: (value: discountCodeParams[] | ((prev: discountCodeParams[]) => discountCodeParams[])) => void
}

const AddDiscountCode = ({exist, setExist, importFrom, allDiscountCodes, setAllDiscountCodes}: params) =>{

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const [addBtnWork, setAddBtnWork] = useState<boolean>(false);
    const setBanner = useContext(BannerContext)?.setBanner;
    const [newDiscountCode, setNewDiscountCode] = useState<discountCodeParams>({
        code: '',
        target: importFrom == 'companyManagementPage' ? 'shoppingCart' : 'product',
        discount: 0,
        discountPercent: null,
        numOfUse: null
    });

    const handleTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewDiscountCode({
            ...newDiscountCode,
            target: e.target.value as "shoppingCart" | "product" | "categorie"
        })
        setChangeHappen(true);
    }
    const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiscountCode({
            ...newDiscountCode,
            code: e.target?.value
        })
        setChangeHappen(true);
    }
    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if (e.target.value == 'percentage') {
            setNewDiscountCode({
                ...newDiscountCode,
                discount: null,
                discountPercent: 0
            })
        } else {
            setNewDiscountCode({
                ...newDiscountCode,
                discountPercent: null,
                discount: 0
            })
        }
     
        setChangeHappen(true);

    }
    const handleDiscountPercent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiscountCode({
            ...newDiscountCode,
            discountPercent: Number(e.target?.value)
        })
        setChangeHappen(true);
    }
    const handleDiscountAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiscountCode({
            ...newDiscountCode,
            discount: Number(e.target?.value)
        })
        setChangeHappen(true);
    }
    const handleNumOfUse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewDiscountCode({
            ...newDiscountCode,
            numOfUse: Number(e.target?.value)
        })
        setChangeHappen(true);
    }

    const addBtnClicked = async () => {

        if (!addBtnWork) {
            return ;
        }

        setLoadingIcon(true);
        const newDiscountCode_ = await addDiscountCode(newDiscountCode);
        if (newDiscountCode_) {
            setAllDiscountCodes((prev: discountCodeParams[]) => [...prev, newDiscountCode_]);
            setExist(false);
        }
        setLoadingIcon(false);

    }

    useEffect(() => { 
        if (newDiscountCode?.code && newDiscountCode?.target && (newDiscountCode?.discountPercent || newDiscountCode?.discount) && newDiscountCode?.numOfUse) {
            setAddBtnWork(true);
        }
    }, [newDiscountCode])
    
    useEffect(() => { 
        console.log(newDiscountCode);
    }, [newDiscountCode])

    return (
        <div className={exist ? 'new-discount-code-whole-section' : 'invisible'} >
            <div 
                className="card" 
            >

            <div className="cancel_" onClick={() => setExist(false)}>
                <FontAwesomeIcon icon={faX}/>
            </div>

                <div className="item">
                    <strong>{"code"} : </strong>
                    <input 
                        className=""
                        onChange={(e) => handleCode(e)}
                        placeholder={'000'}
                    />
                </div>

                <div className="item">
                    <strong>{"target"} : </strong>
                    <select 
                        className=""
                        onChange={(e) => handleTarget(e)}
                    >
                        {importFrom == 'companyManagementPage' && <option value="shoppingCart">shoppingCart</option>}
                        <option value="product">Product</option>
                        <option value="categorie">Categorie</option>
                    </select>
                </div>

                
                <div className="item">
                    <strong>{"type"} : </strong>
                    <select 
                        className=""
                        onChange={(e) => handleType(e)}
                    >
                        <option value="amunt">amunt</option>
                        <option value="percentage">percentage</option>
                    </select>
                </div>

                {newDiscountCode?.discountPercent != null && <div className="item">
                    <strong>{"percentage"} : </strong>
                    <input 
                        type="number"
                        className=""
                        onChange={(e) => handleDiscountPercent(e)}
                        placeholder={'0'}
                    />
                </div>}

                {newDiscountCode?.discount != null && <div className="item">
                    <strong>{"amount"} : </strong>
                    <input 
                        type="number"
                        className=""
                        onChange={(e) => handleDiscountAmount(e)}
                        placeholder={'0'}
                    />
                </div>}

                <div className="item">
                    <strong>{"Num of use"} : </strong>
                    <input 
                        type="number"
                        className=""
                        onChange={(e) => handleNumOfUse(e)}
                        placeholder={'0'}
                    />
                </div>

                <h4 
                    className='commit-btn' 
                    onClick={addBtnClicked}
                    style={{
                        backgroundColor: addBtnWork ? '' : 'var(--ashen-semi-transparent)'
                    }}
                >
                    {activeLanguage?.addW}
                </h4>

            </div>
            
        </div>
    )
}
export default AddDiscountCode;