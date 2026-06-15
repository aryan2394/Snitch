import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import stockOfVariant from "../dao/product.dao.js";
export async function addToCart(req, res) {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    //  pahle check ki product exist and if exist then kya same product hai hi variant ya differnt product ka vraiant ya aisa ho product ho variant missing
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId,
    })
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "product or variant not found",
        })
    }
    const cart = (await cartModel.findOne({ user: req.user._id })) || await cartModel.create({ user: req.user._id });
    const isProductAlreadyInCart = cart.items.some((item) => item.product.toString() === productId && item.variant.toString() === variantId);
    const stock = await stockOfVariant(productId, variantId);
    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find((item) => item.product.toString() === productId && item.variant.toString() === variantId).quantity;
        if (quantityInCart + quantity > stock) {
            return res.status(400).json({
                success: false,
                message: "Quantity exceeds stock",
            })
        }
        await cartModel.findOneAndUpdate(
            {
                user: req.user._id,
                "items.product": productId,
                "items.variant": variantId,
            },
            {
                $set: {
                    "items.$.quantity": quantityInCart + quantity,
                }
            },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
        })
    }
    if (quantity > stock) {
        return res.status(400).json({
            success: false,
            message: "Quantity exceeds stock",
        })
    }
    cart.items.push({
        product: productId,
        variant: variantId,
        quantity: quantity,
        price: product.variants.find((variant) => variant._id.toString() === variantId).price,
    });
    await cart.save();
    return res.status(200).json({
        success: true,
        message: "Item added to cart successfully",
    })
}
export async function getCart(req, res) {
    const cart = await cartModel.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Cart not found",
        })
    }
    return res.status(200).json({
        success: true,
        cart,
    })
}