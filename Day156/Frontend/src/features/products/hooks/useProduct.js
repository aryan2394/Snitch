import { setSellerProducts, setProducts } from "../state/product.slice";
import { createProduct, getSellerProducts, getAllProducts, getProductDetail, addProductVariant, deleteProduct } from "../services/product.api";
import { useDispatch } from "react-redux"
export const useProduct = () => {
    const dispatch = useDispatch();
    async function handleCreateProduct(formData) {
        const data = await createProduct(formData);
        return data.product;
    }
    async function handleGetSellerProduct() {
        const data = await getSellerProducts();
        dispatch(setSellerProducts(data.products))
        return data.products;
    }
    async function handleGetAllProducts(queryParams = {}) {
        const data = await getAllProducts(queryParams);
        dispatch(setProducts(data.products));
        return data.products;
    }
    async function handleGetProductById(productId) {
        const data = await getProductDetail(productId);
        return data.product;
    }
    async function handleAddProductVariant(productId, productVariant) {
        const data = await addProductVariant(productId, productVariant);
        return data;
    }
    async function handleDeleteProduct(productId) {
        const data = await deleteProduct(productId);
        dispatch(setSellerProducts(data.product));
        return data.product;
    }
    return {
        handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById, handleAddProductVariant, handleDeleteProduct
    }
}