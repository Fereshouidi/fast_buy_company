'use client';

import { activeLanguageContext } from "@/app/contexts/activeLanguage";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import { BullentinBoard } from "@/app/contexts/BullentinBoard";
import { companyInformationsParams } from "@/app/contexts/companyInformation";
import { LoadingIconContext } from "@/app/contexts/loadingIcon";
import { getAllBullentinBoard, updateBullentinBoardById, uploadImage } from "@/app/crud";
import LoadingIcon from "@/app/svg/icons/loading/loading";
import { faCheck, faPen, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";

type Params = {
    activeBullentinBoard: BullentinBoard | undefined
    setActiveBullentinBoard: (value: BullentinBoard) => void
    companyInformation: companyInformationsParams
    setCompanyInformation: (value: companyInformationsParams) => void
}
const BullentinBoardSection = ({activeBullentinBoard, setActiveBullentinBoard, companyInformation, setCompanyInformation}: Params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage;
    const [changeHappen, setChangeHappen] = useState<boolean>(false);
    const setLoadingIcon = useContext(LoadingIconContext)?.setExist;
    const setBanner = useContext(BannerContext)?.setBanner;
    const [loadingImage, setLoadingImage] = useState<boolean[]>([]);
    // const [bullentinBoards, setBullentinBoards] = useState<BullentinBoard[] | undefined>(undefined);
    const imagesRef = useRef<(HTMLInputElement | null)[]>(Array(activeBullentinBoard?.images?.length).fill(null));
    const addImageRef = useRef<HTMLInputElement | null>(null);
    const [imageSelected, setImageSelected] = useState<number>(NaN);
    const [loadingAddImage, setLoadingAddImage] = useState<boolean>(false);


    useEffect(() => {
        const loadingList_ = activeBullentinBoard?.images?.map(() => false) ?? [];        
        setLoadingImage(loadingList_);
        
    }, [activeBullentinBoard?._id, activeBullentinBoard?.images?.length])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        
        const file = e.target.files?.[0]; 
        if (!file) return;
    
        if (!file.type.startsWith("image/")) {
            alert("The selected file is not an image!");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const result = event.target?.result;
                if (typeof result === "string") { 
                
                    setLoadingImage(loadingImage.map((value, i) => i === index ? true : value));
                    const uploadedImageUrl = await uploadImage(result);
                    if (uploadedImageUrl && activeBullentinBoard?.images[index]) {
                        setActiveBullentinBoard({
                            ...activeBullentinBoard,
                            images: activeBullentinBoard?.images?.map((image, i) => i == index ? uploadedImageUrl : image)
                        })
                        setLoadingImage(loadingImage.map((value, i) => i === index ? false : value));
                        setChangeHappen(true);
                    }
                } else {
                    alert("The type of this picture is unsuitable!");
                }
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };
    
        reader.readAsDataURL(file);
        
    }
    const HandleDeleteBtn = () => {
        setActiveBullentinBoard({
            ...activeBullentinBoard,
            images: activeBullentinBoard?.images?.filter((image, index) => index == imageSelected ? null : image)
        })
        setImageSelected(NaN);
        setChangeHappen(true);
    }
    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
                
        const file = e.target.files?.[0]; 
        if (!file) return;
    
        if (!file.type.startsWith("image/")) {
            alert("The selected file is not an image!");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const result = event.target?.result;
                if (typeof result === "string") {
                    setLoadingAddImage(true);
                    const uploadedImageUrl = await uploadImage(result);
                    if (uploadedImageUrl ) {
                        setActiveBullentinBoard({
                            ...activeBullentinBoard,
                            images: [...activeBullentinBoard?.images, uploadedImageUrl],
                        })
                        setLoadingAddImage(false);
                        setChangeHappen(true);
                    }
                } else {
                    alert("The type of this picture is unsuitable!");
                }
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };
    
        reader.readAsDataURL(file);
        
    }
    const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveBullentinBoard({
            ...activeBullentinBoard,
            link: e.target?.value
        })
        setChangeHappen(true);

    }
    const handleInputSecondsNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveBullentinBoard({
            ...activeBullentinBoard,
            changingTime: Number(e.target?.value)
        })
        setChangeHappen(true);
    }
    const handleDone = async(e: React.MouseEvent<HTMLInputElement>) => {

        if (!changeHappen) {
            return;
        }

        setLoadingIcon(true);
        const isDone = await updateBullentinBoardById(activeBullentinBoard);
        if (isDone) {
            setBanner(true, 'BullentinBoard has been updated successfully', 'success');
        } else {
            setBanner(true, activeLanguage?.someErrorHappen, 'success');
        }
        setLoadingIcon(false);
        setChangeHappen(false);
    }


    return (
        <div className={activeBullentinBoard ? 'bullentin-board-section-container' : 'invisible'}>
            
            <div id="bullentin-board-section">

                <header className="header"> 
                    
                    <div className="handling">

                        <div className="handling-item add-btn" onClick={() => addImageRef.current?.click()} >
                            {activeLanguage?.addW}
                            <FontAwesomeIcon 
                                icon={faPlus} 
                                className="add-icon"
                            />
                            <input type="file" className="invisible" ref={addImageRef} onChange={(e) => handleAddImage(e)}/>
                            {loadingAddImage && <LoadingIcon className={'Loading-icon-'}/>}
                        </div>
                        <div className="handling-item" 
                            style={{
                                backgroundColor: imageSelected >= 0? 'red' : '',
                                color: imageSelected >= 0? 'white' : ''
                            }}
                            onClick={HandleDeleteBtn}
                        >
                            {activeLanguage?.deleteW}
                                <FontAwesomeIcon 
                                icon={faTrash} 
                                className="delete-icon"
                            />
                        </div>
                        <div 
                            className="handling-item"
                            style={{
                                backgroundColor: imageSelected >= 0 ? 'var(--black)' : '',
                                color: imageSelected >= 0 ? 'var(--white)' : ''
                            }}  
                            onClick={() => imagesRef.current[imageSelected].click()}
                        >
                            {activeLanguage?.editW}
                                <FontAwesomeIcon 
                                icon={faPen} 
                                className="add-icon"
                            />
                        </div>
                        <div className="handling-item" 
                            style={{
                                backgroundColor: changeHappen? 'green' : '',
                                color: changeHappen? 'white' : ''
                            }}
                            onClick={handleDone}
                        >
                            {activeLanguage?.doneW}
                                <FontAwesomeIcon 
                                icon={faCheck} 
                                className="done-icon"
                            />
                        </div>
             
                    </div>

                    <h4>{
                        activeLanguage?.language == 'arabic' ?
                        activeBullentinBoard?.name?.arabic :
                        activeBullentinBoard?.name?.english
                    }</h4>

                    <div className="cancel_" onClick={() => setActiveBullentinBoard(undefined)}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>

                </header>

                <section id="bullentin-board-management-section" className="scroll">

                    <div className="params">

                        <div className="container_ container1">
                            <h4>{activeLanguage?.linkW} :</h4> 
                            <input type="text" 
                                className="input-link" 
                                placeholder={activeLanguage?.urlW + "..." }
                                onChange={(e) => handleUrlInput(e)}
                                defaultValue={activeBullentinBoard?.link}
                            />
                        </div>
                        
                        <div className="container_ container2">
                            <h4>{activeLanguage?.changePictureEvery}</h4>
                            <input type="number" 
                                className="input-seconds-num" 
                                placeholder={activeLanguage?.time?.secondW + "..."} 
                                onChange={(e) => handleInputSecondsNum(e)} 
                                defaultValue={activeBullentinBoard?.changingTime}
                            />
                            <h4>{activeLanguage?.time?.secondW}</h4>
                        </div>
                        
                    </div>

                    <p className="note"> <strong>{activeLanguage?.noteW}</strong>{activeLanguage?.changingImageNoteP}</p>
    

                    <h4 className="tittle">{activeLanguage?.imagesW} : </h4>

                    {activeBullentinBoard?.images?.length > 0 ? activeBullentinBoard.images.map((image, index) => {
                        return <div key={index} 
                                className="backgrounds-div" 
                                style={{border: imageSelected == index ? `3px solid ${companyInformation?.primaryColor}` : ''}}
                                onClick={() => setImageSelected(index)}>
                            <img src={image} alt="" />
                            <input
                                type="file"
                                className='input-file' 
                                ref={(el) => { imagesRef.current[index] = el; }}
                                onChange={(e) => handleImageChange(e, index)}
                            />
                            {loadingImage[index] && <LoadingIcon className={'Loading-icon-'}/>}
                        </div>
                    })
                
                    : <div>{activeLanguage?.noImagesP}</div>
                }

                </section>
            </div>

        </div>
    )
}
export default BullentinBoardSection;