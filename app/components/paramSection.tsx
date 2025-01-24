'use client';
import { activeLanguageContext } from "../contexts/activeLanguage";
import { CSSProperties, useContext } from "react";
import { paramSectionContext } from "../contexts/paramSection";
import LanguageSelector from "./smallComponent/language";
import english from '@/app/languages/english.json';

type params = {
    className?: string,
    id?: string,
    style?: CSSProperties,

}
const ParamSection = ({className, id, style}: params) => {

    const activeLanguage = useContext(activeLanguageContext)?.activeLanguage || english;
    const paramSection = useContext(paramSectionContext);
    // const [paramSectionExist, setParamSectionExist] = useState<boolean>(paramSectionContainer.exist);

    const handleParamSectionContainer = () => {
        paramSection.setExist(false);
        setTimeout(() => {
            paramSection.setContainerExist(false);
        }, 300)
    }
    const handleParamSection = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }

    const styleContainer: CSSProperties = {
        //display: paramSection.containerExist ? '' : 'none',
        position: 'fixed',
        top: 0,
        marginTop: 'var(--header-height)',
        left: 0,
        direction: activeLanguage?.language == 'arabic' ? 'ltr' : 'rtl',
        width: '100vw',
        height: "100vh",
        backgroundColor: 'var(--black-almost-transparnt)',
        padding: 0,
        opacity: paramSection.exist ? 1 : 0,
        transition: '0.3s ease',
        visibility: paramSection.containerExist ? 'visible' : 'hidden',

    }
        const style_: CSSProperties = {
        ...style,
        direction: activeLanguage?.language == 'arabic' ? 'rtl' : 'ltr',
        margin: 0,
        marginRight: paramSection.exist && activeLanguage?.language != 'arabic' ? '0' : 'calc(-1 * calc(var(--long-width) *1.5))',
        marginLeft: paramSection.exist && activeLanguage?.language == 'arabic' ? '0' : 'calc(-1 * calc(var(--long-width) *1.5))',
        backgroundColor: 'var(--white)',
        height: 'calc(100vh - var(--header-height))',
        width: 'calc(var(--long-width) *1.5)',
        transition: '0.3s ease',
    }

    return (
        <div style={styleContainer} onClick={handleParamSectionContainer}>
            <div className={className} id={id} style={style_} onClick={(e) => handleParamSection(e)}>
                ParamSection
                <LanguageSelector/>
            </div>
        </div>
    )
}
export default ParamSection;