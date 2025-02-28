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
        console.log(conpanyInformations);
        
        
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

export const getAllDeleveryBoys = async() => {
    try{
        const response = await axios.get(url + '/get/all/deleveryBoys');
        console.log(response.data[0].ordersProcessing);
        
        const data = response.data;
        
        return data;
    }catch(err){
        throw err;
    }
}


export const updateAdminById = async(updatedAdmin) => {
    
    try{
        const response = await axios.put(url + '/update/admin/by/id', {
            id: updatedAdmin?._id,
            updatedAdmin
        });
        const data = response.data;
        
        return data;
    }catch(err){
        throw err;
    }
}

export const updateManyAdmins = async(updatedAdmins) => {

    const copyList = updatedAdmins.map(admin => ({...admin}));

    copyList.forEach(admin => {
        for (let key in admin) {
            if (!["verification", "_id", 'permissions', 'timeTable'].includes(key) ) {
                delete admin[key];
            }
        }
    });
    

    try{
        const response = await axios.patch(url + '/update/manyAdmins', {updatedAdmins: copyList});
        const data = response.data;
        
        return updatedAdmins;
    }catch(err){
        throw err;
    }
}

export const updateManyDeliveryBoys = async(updatedDeliveryBoys) => {

    const copyList = updatedDeliveryBoys.map(deliveryBoy => ({ ...deliveryBoy }));

    copyList.forEach(deliveryBoy => {
        for (let key in deliveryBoy) {
            if (!["verification", "_id", 'type', 'timeTable'].includes(key) ) {
                delete deliveryBoy[key];
            }
        }
    });
    

    try{
        const response = await axios.patch(url + '/update/manyDeliveryBoys', {updatedDeliveryBoys: copyList});
        const data = response.data;
        console.log(data);
        
        return updatedDeliveryBoys;
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

export const deleteManyDeliveryBoys = async(deliveryBoys) => {

    const deliveryBoysIds = [];
    deliveryBoys.map(deliveryBoy => {
        deliveryBoysIds.push(deliveryBoy._id);
    })
    console.log(deliveryBoysIds);

    try{
        const response = await axios.delete(url + '/delete/manyDeliveryBoys', {
            params: {deliveryBoysIds}
        });
        const data = response.data;
        console.log(data);
        
        return data;
    }catch(err){
        throw err;
    }
}

export const updateAdminTimeTable = async(id, newTimeTable) => {    
    
    try{
        const response = await axios.put(url + '/update/admin/timeTable', {id, newTimeTable});
        const data = response.data;  
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const updateDeleveryBoyTimeTable = async(id, newTimeTable) => {
    
    try{
        const response = await axios.put(url + '/update/deleveryBoy/timeTable', {id, newTimeTable});
        const data = response.data;  
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const getDeliveryBoyById = async(id) => {
    try{
        const response = await axios.get(url + '/get/deliveryBoy/by/id/' + id);
        const data = response.data;
        
        return data;
    }catch(err){
        throw err;
    }
}

export const updateOrderDeliveryBoy = async(orderId, deliveryBoyId) => {    
    
    try{
        const response = await axios.put(url + '/update/order/deliveryBoy', {orderId, deliveryBoyId});
        const data = response.data;  
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const searchOrders = async(search, filter) => {
    try{
        const response = await axios.get(url + '/search/orders', {
            params: { search, filter }
        });
        const data = response.data;
        console.log(data);
        
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const getOrdersByFilter = async(filter) => {
    try{
        const response = await axios.get(url + '/get/orders/by/filter', {
            params: { filter }
        });
        const data = response.data;
        console.log(data);
        
        return data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const getAllCustomers = async() => {
    try{
        const response = await axios.get(url + '/get/allCustomers')
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const deleteManyCustomer = async(customers) => {

    const customersId = [];
    customers.map(customer => {
        customersId.push(customer._id);
    })
    console.log(customersId);


    try{
        const response = await axios.delete(url + '/delete/manyCustomer', {
            params: {customersId}
        });
        const data = response.data;
        console.log(data);
        
        return data;
    }catch(err){
        throw err;
    }
}

export const updateManyCustomers = async(updatedCustomers) => {

    const copyList = updatedCustomers.map(customer => ({...customer}));

    copyList.forEach(customer => {
        for (let key in customer) {
            if (!["verification", "_id"].includes(key) ) {
                delete customer[key];
            }
        }
    });
    

    try{
        const response = await axios.patch(url + '/update/manyCustomers', {updatedCustomers: copyList});
        const data = response.data;
        
        return updatedCustomers;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const getAllDiscountCodes = async() => {
    try{
        const response = await axios.get(url + '/get/all/discountCodes');
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const updateAllDiscountCodes = async(discountsCode) => {
    try{
        const response = await axios.patch(url + '/update/all/discountCodes', {discountsCode});
        const data = response.data;
        
        return data;
    }catch(err){
        throw err;
    }
}

export const getDiscountCodesForPageOfProductManagement = async() => {
    try{
        const response = await axios.get(url + '/get/discountCodes/for/page/of/productManagement');
        const data = response.data;
        return data;
    }catch(err){
        throw err;
    }
}

export const addDiscountCode = async(discountCodeData) => {
    try{
        const response = await axios.post(url + '/add/discountCode', {discountCodeData});
        const data = response.data;
        console.log(response.data);
        
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const deleteDiscountCodeById = async(id) => {
    try{
        const response = await axios.delete(`${url}/delete/discountCode/by/id/${id}`);
        const data = response.data;
        console.log(response.data);
        
        return data;
    }catch(err){
        console.log(err);
        throw err;
    }
}

export const aplyDiscountCodeOnCategories = async(categoriesId, discountCodeId) => {
    
    try{
        const response = await axios.put(url + '/aply/discountCode/on/categories', {categoriesId, discountCodeId});
        const data = response.data;
        console.log(response.data);
        
        return data;

    }catch(err){
        console.error(err);
        return null;
    }
}

export const getAllBullentinBoard = async() => {
    try{
        const response = await axios.get(url + '/get/all/bullentinBoard');
        const data = response.data;
        return data
    }catch(err){
        throw err;
    }
}

export const undoDiscountCodeOnCategories = async(categoriesId, discountCodeId) => {
    
    try{
        const response = await axios.put(url + '/undo/discountCode/on/categories', {categoriesId, discountCodeId});
        const data = response.data;
        console.log(response.data);
        
        return data;

    }catch(err){
        console.error(err);
        return null;
    }
}

export const updateBullentinBoardById = async(updatedBullentinBoardData) => {

    console.log(updatedBullentinBoardData);

    if (!updatedBullentinBoardData?.changingTime) {
        console.log(updatedBullentinBoardData);
        
        updatedBullentinBoardData.changingTime = 0;
    }
    
    try{
        const response = await axios.put(url + '/update/bullentinBoard/by/id', {updatedBullentinBoardData});
        const data = response.data;
        console.log(response.data);
        
        return data;

    }catch(err){
        console.error(err);
        return null;
    }
}

