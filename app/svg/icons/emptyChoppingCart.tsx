import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties, useContext } from "react";
import { CompanyInformationContext } from "@/app/contexts/companyInformation";
import { useRouter } from "next/navigation";
import LoadingIcon_theHolePage from "./loading/loadingHoleOfThePage";
import { ActiveLanguageContext } from "@/app/contexts/activeLanguage";

const EmptyShoppingCart = () => {

    const companyInformation = useContext(CompanyInformationContext);
    const activeLanguage = useContext(ActiveLanguageContext)?.activeLanguage;
    const router = useRouter();

    const goToHomePage = () => {
        <LoadingIcon_theHolePage/>
        router.push('/')
    }

    const style: CSSProperties = {
        width: '100%',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'var(--almost-black)',
        opacity: '0.7',
        fontSize: window.innerWidth > 800 ? 'var(--primary-size)' : 'var(--small-size)'
    };
    const iconStyle: CSSProperties = {
        width: '90%',
        height: '',
        fontSize: 'calc(var(--double-size) *3)',
        marginBottom: '1rem',
        color: '#aaa',
    };
    const styleP: CSSProperties = {
        
    };
    const styleLink: CSSProperties = {
        color: companyInformation?.primaryColor,
        textDecoration: 'underline',
        cursor: "pointer"
    };

    return (
        <div style={style}> 
            <FontAwesomeIcon icon={faCartArrowDown} style={iconStyle} aria-label="Empty shopping cart icon" />
            <p style={styleP}>
                {activeLanguage?.emptyPurchaseP.part1} <span onClick={goToHomePage} style={styleLink}>{activeLanguage?.marketW}</span> {activeLanguage?.emptyPurchaseP.part2}
            </p>
        </div>
    );
};

export default EmptyShoppingCart;
