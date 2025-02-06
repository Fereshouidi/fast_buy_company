const url = 'http://localhost:3002/api';
import axios from "axios";

//https://fast-buy-back-end.vercel.app/api
//http://localhost:3002/api

export const getBulletinBoard = async() => {
    try{
        const response = await axios.get(url + '/get/bullentinBoard');
        const data = response.data;
        return data
    }catch(err){
        throw err;
    }
}

export const getBulletinBoard_two = async() => {
    try{
        const response = await axios.get(url + '/get/bullentinBoard_two');
        const data = response.data;
        return data
    }catch(err){
        throw err;
    }
}

export const getSliderData = async() => {
    try{
        const response = await axios.get(url + '/get/slider');
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const getAllProducts_SortedByRating = async(page, limit) => {
    try{
        const response = await axios.get(url + '/get/products/byRating', 
            {params: { page: page, limit: limit }});
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const getAllCategorie = async() => {
    try{
        const response = await axios.get(url + '/get/categories/tree')
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const getCategoriesByParent = async(id) => {
    try{
        const response = await axios.get(url + '/get/categories/by/parent', {
            params: {parentId: id}
        })
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const getProductsByCategorie = async(id) => {
    try{
        const response = await axios.get(url + '/get/products/by/categorie', {
            params: {parentCategorieId: id}
        })
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

// export const getCategorieById = async(id) => {
//     try{
//         const response = await axios.get(url + '/get/categorie/by/id', {
//             params: {categorieId: id}
//         })
//         const data = response.data;
//         return data;
//     }catch(err){
//         return false;
//     }
// }

export const getCategorieById = async(categorieId) => {
    try{
        const response = await axios.get(url + '/get/categorie/by/id', {
            params: {categorieId}
        })
        const data = response.data;        
        return data;

    }catch(err){
        return null;
    }
}

export const getCategoriesSection = async() => {
    try{
        const categoriesSection = (await axios.get(url + '/get/categoriesSection')).data;
        return categoriesSection;
    }catch(err){
        throw err;
    }
}

export const getConpanyInformations = async() => {
    try{
        const conpanyInformations = (await axios.get(url + '/get/conpanyInformations')).data;        
        
        return conpanyInformations;
    }catch(err){
        throw err;
    }
}

export const getBestCategories = async() => {
    try{
        const bestCategories = (await axios.get(url + '/get/bestCategories')).data;
        return bestCategories;
    }catch(err){
        throw err;
    }
}

export const getProductByBiggestDiscount = async() => {
    try{
        const bestCategories = (await axios.get(url + '/get/product/by/biggestDiscount')).data;
        return bestCategories;
    }catch(err){
        throw err;
    }
}

export const getProductById = async (id) => {
    
    try {
        const response = await axios.get(url + `/get/product/byId`, {
            params: {id}
        });
        const data = response.data;
        return data;

    } catch (err) {
        throw err;
    }
};

export const createAccount = async(customerData) => {
    try{
        const response = await axios.post(url + '/add/customer', {customerData});
        return response.data;
    }catch(err) {
        throw err
    }
}

export const sendActivationToken = async(email, username, companyEmail, companyPassword, activeLanguage, activationToken) => {
    try{
        await axios.post(url + '/send/activationToken', {
            email, username, companyEmail, companyPassword, activeLanguage, activationToken
        });
        
        return true;

    }catch(err) {
        console.log(err);
        return false;
    }
}

export const sendActivationTokenForAdmin = async(email, adminName, companyEmail, companyPassword, activeLanguage, activationToken) => {
    try{
        await axios.post(url + '/send/activationToken/for/admin', {
            email, adminName, companyEmail, companyPassword, activeLanguage, activationToken
        });
        
        return true;

    }catch(err) {
        console.log(err);
        return false;
    }
}

export const getCustomerById = async (id) => {
    
    try {
        const response = await axios.get(url + `/get/customer/byId`, {
            params: {id}
        });
        const data = response.data;
        return data;

    } catch (err) {
        throw err;
    }
};

export const logIn = async (userName, password) => {
    
    try {
        const response = await axios.get(url + `/get/customer/byCredentials`, {
            params: {userName, password}
        });
        
        return {data: response.data, status: response.status};

    } catch (err) {        
        return {status: err.response.status};
    }
};

export const addPurchase = async (purchase) => {   
        
    try{
        const response = await axios.post(url + '/add/purchase', purchase);
        return response.data;
    }catch(err) {
        throw err
    }
}

export const putPurchaseInShoppingCart = async (purchaseId, customerId) => {   
        
    try{
        const response = await axios.post(url + '/put/purchase/in/shoppingCart', {purchaseId, customerId});
        return response.data;
    }catch(err) {
        throw err
    }
}

export const addPurchaseAndPutItInShoppingCart = async (purchase) => {   
        
    try{
        const response = await axios.post(url + '/add/purchase/and/putItInShoppingCart', purchase);
        return response.data;
    }catch(err) {
        throw err
    }
}

export const getShoppingCartsByCustomerId = async (customerId) => {
    
    try {
        const shoppingCarts = await axios.get(url + '/get/activeShoppingCart/by/customer' , {
            params: {customerId}
        })        
        return shoppingCarts.data;
    }catch(err) {
        throw err;
    }
}

export const deletePurchaseById = async (id) => {
    try {
        const response = await axios.delete(url + '/delete/purchase/byId', {
            params: {id}
        })
        return response.data.customer;
    }catch(err) {
        throw err;
    }
}

export const updateQuantitiy = async (updatedPurchase) => {
    try {
        const response = await axios.put(url+ '/update/quantity', updatedPurchase)
        return response.data
    }catch (err) {
        throw err;
    }
}

export const updatePurchase = async (updatedPurchase) => {
    
    try {
        const response = await axios.put(url+ '/update/purchase', updatedPurchase);
        if (response.status == 200) {
            
            return response.data
        } else {
            return updatedPurchase
        }
    }catch (err) {
        throw err;
    }
}

export const addOrder = async (order) => {   
    
    try{
        const response = await axios.post(url + '/add/order', order);        
        return response.data;
    }catch(err) {
        throw err
    }
}

export const getAllDiscountCodesForShoppingCarts = async () => {   
    
    try{
        const response = await axios.get(url + '/get/discountCodes/for/shoppingCarts');   
        return response.data;
    }catch(err) {
        throw err
    }
}

export const gtOrdersByCustomer = async (customerId) => {

    try {
        const orders = await axios.get(url + '/gt/orders/byCustomer' , {
            params: {customerId}
        })        
        
        return orders.data;
    }catch(err) {
        throw err;
    }
}

export const updateLikeStatus = async (purchaseId, likeStatus) => {

    try {
        const response = await axios.put(url + '/update/likeStatus' , { purchaseId, likeStatus })                        
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const updateCustomer = async (customerId, updatedCustomerData) => {

    try {
        const response = await axios.put(url + '/update/customer' , { 
            id: customerId,
            updatedCustomerData 
        })             
        return response.data.customer;
    }catch(err) {
        throw err;
    }
}

export const getPurchasesByCustomerProduct = async (customerId, productId) => {
    
    try {
        const response = await axios.get(url + '/get/purchases/by/customer&product' , {
            params: {customerId, productId}
        })        
        
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const getReviewByCustomerProduct = async (customerId, productId) => {
    
    try {
        const response = await axios.get(url + '/get/review/by/customer&product' , {
            params: {customerId, productId}
        })        
        
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const getProductsByName = async (searchQuery) => {
    
    try {
        const response = await axios.get(url + '/get/products/by/name' , {
            params: {searchQuery}
        })                
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const updateReview = async (reviewId, customerId, productId, customerRating, customerNote) => {
    
    try {
        const response = await axios.put(url + '/update/review' , { 
            reviewId, 
            customerId,
            productId,
            customerRating, 
            customerNote
        })                        
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const getReviewsByProduct = async (productId) => {
    
    try {
        const response = await axios.get(url + '/get/reviews/by/product' , {
            params: {productId}
        })                        
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const getProfitLastWeek = async () => {
    
    try {
        const response = await axios.get(url + '/get/Profit/lastWeek');  
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const getProductForManagementPage = async (categorieId, searchQuery) => {
    
    try {
        const response = await axios.get(url + '/get/product/for/managementPage' , {
            params: {categorieId, searchQuery}
        })                                
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const getProfitLasMonth = async () => {
    
    try {
        const response = await axios.get(url + '/get/Profit/lasMonth');  
        return response.data;
    }catch(err) {
        throw err;
    }
}

export const renameCategorieById = async (categorieId, newName) => {
    
    try {
        const response = await axios.put(url + '/rename/categorie/by/id', {categorieId, newName});  
        return response.data.category;
    }catch(err) {
        throw err;
    }
}

export const addCategorie = async (name, parentCategorie) => {
    
    try {
        const response = await axios.post(url + '/add/categorie', {name, parentCategorie});          
        return response.data.category;

    }catch(err) {
        throw err;
    }
}

export const deleteCategorieById = async (categorieId) => {
    
    try {
        const response = await axios.delete(url + `/delete/categorie/by/id/${categorieId}`);  
        return response.data;

    }catch(err) {
        throw err;
    }
}

export const getProfitOfProductLastWeek = async (productId) => {
    
    try {
        const response = await axios.get(url + `/get/Profit/ofProduct/lastWeek?productId=${productId}`);  
        return response.data;

    }catch(err) {
        throw err;
    }
}

export const uploadImage = async (base64Image) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });
  
    const data = await response.json();
    return data.imageUrl; 
}

export const getAllDiscounts = async () => {
    
    try {
        const response = await axios.get(url + `/get/allDiscounts`);  
        return response.data;

    }catch(err) {
        throw err;
    }
}

export const updateDiscountById = async (updatedDiscount) => {
    
    try {
        const response = await axios.put(url + `/update/discount/by/id`, {updatedDiscount});  
        return response.data;

    }catch(err) {
        throw err;
    }
}

export const addDiscount = async (newDiscount) => {
    
    try {
        const response = await axios.post(url + `/add/discount`, {newDiscount});  
        console.log(response.data);
        
        return response.data;

    }catch(err) {
        throw err;
    }
}

export const deleteDiscountById = async (discountId) => {
    
    try {
        const response = await axios.delete(url + `/delete/discount/by/id`, {
            params: {discountId}
        });  
        return response.data;

    }catch(err) {
        return null;
    }
}

export const updateProduct = async (updatedProduct) => {    
    
    try {
        const response = await axios.put(url + `/update/product`, {updatedProduct});  
        console.log(response.data.product);
        
        return response.data.product;

    }catch(err) {
        return null;
    }

}

export const getDiscountById = async(discountId) => {
    try{
        const response = await axios.get(url + '/get/discount/by/id', {
            params: {discountId}
        })
        const data = response.data;        
        return data;

    }catch(err){
        return null;
    }
}

export const addProduct = async(productData) => {
    
    try{
        const response = await axios.post(url + '/add/Product', productData);
        const data = response.data;        
        return data;

    }catch(err){
        return null;
    }
}

export const deleteProductById = async(productId) => {
    
    try{
        const response = await axios.delete(url + '/delete/product/by/id/'+ productId);
        const data = response.data;        
        return data;

    }catch(err){
        return null;
    }
}

export const getPurchasesByProduct = async(productId) => {
    
    try{
        const response = await axios.get(url + '/get/purchases/by/product', {
            params: {productId}
        });
        const data = response.data;  
              
        return data;

    }catch(err){
        return null;
    }
}

export const getDeliveredPurchasesByProduct = async(productId) => {
    
    try{
        const response = await axios.get(url + '/get/delivered/purchases/by/product', {
            params: {productId}
        });
        const data = response.data;  
              
        return data;

    }catch(err){
        return null;
    }
}

export const getDeliveredPurchasesByBuyer = async(buyerId) => {
    
    try{
        const response = await axios.get(url + '/get/delivered/purchases/by/buyer', {
            params: {buyerId}
        });
        const data = response.data;  
              
        return data;

    }catch(err){
        console.error(err);
        return null;
    }
}

export const gtAllOrders = async() => {
    
    try{
        const response = await axios.get(url + '/gt/allOrders');
        const data = response.data;
              
        return data;

    }catch(err){
        return null;
    }
}

export const updateOrderStatus = async(orderId, newStatus) => {    
    
    try{
        const response = await axios.put(url + '/update/order/status', {orderId, newStatus});
        const data = response.data;  
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const createAdmin = async(adminData) => {    
    
    try{
        const response = await axios.post(`${url}/create/admin`, {adminData});
        const data = response.data;  
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const getAdminById = async(id) => {    
    console.log(id);
    
    try{
        const response = await axios.post(`${url}/get/admin/by/id/${id}`);
        const data = response.data;  
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const adminLogIn = async (userName, password) => {

    try{
        const response = await axios.get(url + '/get/admin/byCredentials', {
            params: {userName, password}
        });
        const data = response.data;  
              
        return data;

    }catch(err){
        console.error(err.status);
        return err;
    }

}

export const getAllAdmin = async() => {
    try{
        const response = await axios.get(url + '/get/all/admin');
        const data = response.data;
        console.log(data);
        
        return data;
    }catch(err){
        throw err;
    }
}

export const updateAdminById = async(updatedAdmin) => {
    // console.log(updatedAdmin);
    
    try{
        const response = await axios.put(url + '/update/admin/by/id', {
            id: updatedAdmin?._id,
            updatedAdmin
        });
        const data = response.data;
        console.log(data);
        
        return data;
    }catch(err){
        throw err;
    }
}

export const updateManyAdmins = async(updatedAdmins) => {

    console.log(updatedAdmins);

    updatedAdmins.forEach(admin => {
        delete admin.password;
    });

    try{
        const response = await axios.put(url + '/update/manyAdmins', {updatedAdmins});
        const data = response.data;
        console.log(data);
        
        return data;
    }catch(err){
        throw err;
    }
}

export const deleteManyAdmin = async(admins) => {

    const adminsId = [];
    admins.map(admin => {
        adminsId.push(admin._id);
    })
    console.log(adminsId);


    try{
        const response = await axios.delete(url + '/delete/manyAdmin', {
            params: {adminsId}
        });
        const data = response.data;
        console.log(data);
        
        return data;
    }catch(err){
        throw err;
    }
}
