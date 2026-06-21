import axios from "axios"
const productApiInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})
export async function createProduct(formData) {
    const response = await productApiInstance.post("/", formData);
    return response.data;
}
export async function getSellerProducts() {
    const response = await productApiInstance.get("/seller");
    return response.data;
}
export async function getAllProducts(queryParams = {}) {
    const response = await productApiInstance.get("/", { params: queryParams });
    return response.data;
}
export async function getProductDetail(productId) {
    const response = await productApiInstance.get(`/detail/${productId}`);
    return response.data;
}
export async function addProductVariant(productId, productVariant) {
    const formData = new FormData();
    productVariant.images.forEach(img => formData.append("images", img.file));
    formData.append("priceAmount", productVariant.price);
    formData.append("stock", productVariant.stock);
    formData.append("attributes", JSON.stringify(productVariant.attributes));
    const response = await productApiInstance.post(`/${productId}/variants`, formData);
    return response.data;
}