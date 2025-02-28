'use client';

import CategorieSelector from "@/app/components/CategoriesSelector";
import ProductDisplaySection from "@/app/components/productDisplaySection";
import SearchBar from "@/app/components/smallComponent/searchBar";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { getAllDiscountCodes, getDiscountCodesForPageOfProductManagement, getProductForManagementPage } from "@/app/crud";
import { useContext, useEffect, useState } from "react";
import '../style.css';
import { CategorieParams } from "@/app/contexts/categories";
import ProductDetail from "@/app/components/productdetail/productDetail";
import DiscountsSection from "@/app/components/discountsSection";
import AddProductSection from "@/app/components/productdetail/addProductSection";
import { AdminContext } from "@/app/contexts/adminData";
import { BannerContext } from "@/app/contexts/bannerForEverything";
import DiscountCodeSection from "../companyManagement/discountCodeSection";
import '../companyManagement/style.css';
import { discountCodeParams } from "@/app/contexts/discountCode";


const ProductManagmentPage = () => {

    const [products, setProducts] = useState<productParams[] | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeCategorie, setActiveCategorie] = useState<CategorieParams | undefined>(undefined);
    const [productDetails, setProductDetails] = useState<productParams | undefined>(undefined);
    const [discountsSectionExist, setDiscountsSection] = useState<boolean>(false);
    const [isAddProductSectionExist, setIsAddProductSectionExist] = useState<boolean>(false);
    const [discountCodeSectionExist, setDiscountCodeSectionExist] = useState<boolean>(false);
    const adminData = useContext(AdminContext)?.admin;
    const setBanner = useContext(BannerContext)?.setBanner;
    const [allDiscountCodes, setAllDiscountCodes] = useState<discountCodeParams[]>();


    

    useEffect(() => {
        const fetchData = async () => {
            const discountCodes = await getDiscountCodesForPageOfProductManagement();

            setAllDiscountCodes(discountCodes);
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            const products_ = await getProductForManagementPage(activeCategorie?._id, searchQuery);
            setProducts(products_);
        }
        fetchData()
        
    }, [searchQuery, activeCategorie]);           
    

    if (!adminData?.permissions?.includes('productsManagement')) {

        return (
            <div className="page">
                'You do not have product management permissions !'
            </div>
        )

    } else {

        return (
            <div className="page">
                <CategorieSelector activeCategorie={activeCategorie} setActiveCategorie={setActiveCategorie}/>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}  discountsSectionExist={discountsSectionExist} setDiscountsSection={setDiscountsSection} isAddProductSectionExist={isAddProductSectionExist} setIsAddProductSectionExist={setIsAddProductSectionExist} setDiscountCodeSectionExist={setDiscountCodeSectionExist}/>
                <ProductDisplaySection products={products} setProducts={setProducts} productDetails={productDetails} setProductDetails={setProductDetails}/>
                <ProductDetail productDetails={productDetails} setProductDetails={setProductDetails} allProducts={products} setAllProducts={setProducts}/>
                <DiscountsSection exist={discountsSectionExist} setExist={setDiscountsSection} />
                <AddProductSection exist={isAddProductSectionExist} setExist={setIsAddProductSectionExist} allProducts={products} setAllProducts={setProducts}/>
                <DiscountCodeSection exist={discountCodeSectionExist} setExist={setDiscountCodeSectionExist} importFrom={'productManagementPage'} allDiscountCodes={allDiscountCodes} setAllDiscountCodes={setAllDiscountCodes}/>
                </div>
        )
    }
}
export default ProductManagmentPage;

type params = {
    productDetails: productParams | undefined, 
    setProductDetails: (value: productParams) => void;
    allProducts: productParams[],
    setAllProducts: (value: productParams[]) => void;
}