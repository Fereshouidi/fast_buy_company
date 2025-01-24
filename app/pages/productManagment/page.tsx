'use client';

import CategorieSelector from "@/app/components/CategoriesSelector";
import ProductDisplaySection from "@/app/components/productDisplaySection";
import SearchBar from "@/app/components/smallComponent/searchBar";
import { productParams } from "@/app/contexts/productSelectForShowing";
import { getProductForManagementPage } from "@/app/crud";
import { useEffect, useState } from "react";
import '../style.css';
import { CategorieParams } from "@/app/contexts/categories";
import ProductDetail from "@/app/components/productdetail/productDetail";
import DiscountsSection from "@/app/components/discountsSection";

const ProductManagmentPage = () => {

    const [products, setProducts] = useState<productParams[] | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeCategorie, setActiveCategorie] = useState<CategorieParams | undefined>(undefined);
    const [productDetails, setProductDetails] = useState<productParams | undefined>(undefined);
    const [discountsSectionExist, setDiscountsSection] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const products_ = await getProductForManagementPage(activeCategorie?._id, searchQuery);
            setProducts(products_);
        }
        fetchData()
        
    }, [searchQuery, activeCategorie]);           
    

    return (
        <div className="page">
            <CategorieSelector activeCategorie={activeCategorie} setActiveCategorie={setActiveCategorie}/>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}  discountsSectionExist={discountsSectionExist} setDiscountsSection={setDiscountsSection} />
            <ProductDisplaySection products={products} setProducts={setProducts} productDetails={productDetails} setProductDetails={setProductDetails}/>
            <ProductDetail productDetails={productDetails} setProductDetails={setProductDetails}/>
            <DiscountsSection exist={discountsSectionExist} setExist={setDiscountsSection} />
        </div>
    )
}
export default ProductManagmentPage;