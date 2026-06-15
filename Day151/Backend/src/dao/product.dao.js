import productModel from "../models/product.model.js";
async function stockOfVariant(productId,variantId){
    const product=await productModel.findOne({
        _id:productId,
        "variants._id":variantId,
    })
    if(!product){
        return null;
    }
    const variant=product.variants.find((variant)=>variant._id.toString()===variantId);
    return variant.stock;
}
export default stockOfVariant;