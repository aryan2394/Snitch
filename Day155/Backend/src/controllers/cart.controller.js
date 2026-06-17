import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import paymentModel from "../models/payment.model.js";
import stockOfVariant from "../dao/product.dao.js";
import { getCartDetails } from "../dao/cart.dao.js";
import {createOrder} from "../services/payment.service.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";
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
export const getCart = async (req, res) => {
    const user = req.user

    let cart = await getCartDetails(user._id)

    if (!cart) {
        cart = await cartModel.create({ user: user._id })
    }

    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}
export async function incrementCartItemQuantity(req, res) {
    const { productId, variantId } = req.params;
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    });
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "product or variant not found"
        })
    }
    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(404).json({
            message: "cart not found",
            success: false
        })
    }
    const stock = await stockOfVariant(productId, variantId);
    const item = cart.items.find((item) => item.product.toString() === productId && item.variant.toString() === variantId);
    if (!item) {
        return res.status(404).json({
            message: "item not found",
            success: false
        })
    }
    if (item.quantity + 1 > stock) {
        return res.status(400).json({
            message: "Quantity exceeds stock",
            success: false
        })
    }
    item.quantity += 1;
    await cart.save();
    return res.status(200).json({
        message: "Item incremented successfully",
        success: true
    })
}
export async function decrementCartItemQuantity(req, res) {
    const { productId, variantId } = req.params;
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })
    if (!product) {
        return res.status(404).json({
            message: "product or variant not found",
            success: false
        })
    }
    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
        return res.status(404).json({
            message: "cart not found",
            success: false
        })
    }
    const stock = await stockOfVariant(productId, variantId);
    const item = cart.items.find((item) => item.product.toString() === productId && item.variant.toString() === variantId);
    if (!item) {
        return res.status(404).json({
            message: "item not found",
            success: false
        })
    }
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.items = cart.items.filter(
            (cartItem) => cartItem.product.toString() !== productId || cartItem.variant.toString() !== variantId
        );
    }

    await cart.save();

    return res.status(200).json({
        message: "Cart item updated successfully",
        success: true
    });
}
export async function removeCartItem(req, res) {
    const {productId,variantId}=req.params;
    const product=await productModel.findOne({
        _id:productId,
        "variants._id":variantId
    })
    if(!product)
    {
        return res.status(404).json({
            message:"product or variant not found",
            success:false
        })
    }
    const cart=await cartModel.findOne({user:req.user._id});
    if(!cart)
    {
        return res.status(404).json({
            message:"cart not found",
            success:false
        })
    }
    const stock=await stockOfVariant(productId,variantId);
    const item=cart.items.find((item)=>item.product.toString()===productId && item.variant.toString()===variantId);
    if(!item)
    {
        return res.status(404).json({
            message:"item not found",
            success:false
        })
    }
    cart.items=cart.items.filter((cartItem)=>cartItem.product.toString()!==productId || cartItem.variant.toString()!==variantId);
    await cart.save();
    return res.status(200).json({
        message:"Item removed successfully",
        success:true
    })
}
export async function createOrderController(req,res)
{
    const cart=await getCartDetails(req.user._id)
    if(!cart)
    {
        return res.status(404).json({
            message:"cart not found",
            success:false
        })
    }
    const order=await createOrder({amount:cart.totalPrice,currency:cart.currency});
    const payment = await paymentModel.create({
        user: req.user._id,
        razorPay: {
            orderId: order.id,
        },
        amount: {
            amount: cart.totalPrice,
            currency: cart.currency
        },
        orderDetails: cart.items.map(item => ({
            title: item.product.title,
            productId: item.product._id,
            variantId: item.variant,
            quantity: item.quantity,
            images: item.product.variants?.images || item.product.images,
            description: item.product.description,
            price: {
                amount: item.product.variants?.price?.amount || item.product.price?.amount || 0,
                currency: item.product.variants?.price?.currency || item.product.price?.currency || "INR"
            }
        }))
    })
    res.status(200).json({
        message:"Order created successfully",
        success:true,
        order
    })
} 

export const verifyOrderController=async (req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
    const payment=await paymentModel.findOne({
        "razorPay.orderId":razorpay_order_id,
        status:"pending"
    })
    if(!payment)
    {
        return res.status(404).json({
            message:"payment not found",
            success:false
        })
    }
    const isPaymentValid=validatePaymentVerification({
        order_id:razorpay_order_id,
        payment_id:razorpay_payment_id
    },razorpay_signature,config.RAZORPAY_KEY_SECRET) 
    if(!isPaymentValid)
    {
        payment.status="failed";
        await payment.save()
        return res.status(400).json({
            message:"Payment verification failed",
            success:false
        })
    } 
    payment.razorPay.paymentId=razorpay_payment_id;
    payment.razorPay.signature=razorpay_signature;
    payment.status="paid";
    await payment.save();
    return res.status(200).json({
        message:"Payment verified successfully",
        success:true
    })
} 