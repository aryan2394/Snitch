import { json } from 'express';
import productModel from '../models/product.model.js';
import { uploadFile } from '../services/storage.service.js';
export async function createProduct(req,res)
{
    const {title,description,priceAmount,priceCurrency}=req.body;
    const seller=req.user._id;
    const images=await Promise.all(req.files.map(async(file)=>
    {
        const result=await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname,
        });
        return result;
    }))
    const product=await productModel.create({
        title,
        description,
        price:{
            amount:priceAmount,
            currency:priceCurrency || "INR",
        },
        seller,
        images,
    })
    res.status(201).json({
        message:"Product created successfully",
        success:true,
        product,
    });
}
export async function getSellerProducts(req,res)
{
    const seller=req.user;
    const products=await productModel.find({seller:seller._id});
    res.status(200).json({
        message:"products fetched sucessfully",
        success:true,
        products
    })
}
export async function getProducts(req, res) {
    try {
        const { q, page = 1, limit = 10 } = req.query;
        let query = {};

        if (q) {
            const cleanQuery = q.trim();
            if (cleanQuery) {
                // Case-insensitive regex substring search on title or description
                query.$or = [
                    { title: { $regex: cleanQuery, $options: "i" } },
                    { description: { $regex: cleanQuery, $options: "i" } }
                ];
            }
        }

        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.max(1, Math.min(100, parseInt(limit) || 10));
        const skipNum = (pageNum - 1) * limitNum;

        // Fetch products matching the query, sorting by newest first
        const products = await productModel.find(query)
            .sort({ createdAt: -1 })
            .skip(skipNum)
            .limit(limitNum);

        const totalProducts = await productModel.countDocuments(query);

        res.status(200).json({
            message: "products fetched successfully",
            success: true,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalProducts / limitNum),
                totalProducts
            },
            products
        });
    } catch (err) {
        console.error("Error in getProducts controller:", err);
        res.status(500).json({
            message: "Internal server error during search",
            success: false,
            error: err.message
        });
    }
}
export async function getProductDetails(req,res)
{
    const productId=req.params.id;
    const product=await productModel.findById(productId);
    if(!product)
    {
        return res.status(404).json({
            message:"product not found",
            success:false,
            error:"Product not found"
        })
    }
    res.status(200).json({
        message:"product fetched sucessfully",
        success:true,
        product,
    })
}
export async function addProductVariant(req,res)
{
    // dekho isko banate samay kaafi cheezein dekhni hogi like images are optional lkein aa sakti hai variants mein se
    // stock by default 0 hai lekin wo bhi aa sakta hai body se 
    // ussi tarah price of amount and baaki cheezein

    const productId=req.params.productId;
    const product=await productModel.findOne({
        _id:productId,
        seller:req.user._id,
    
    })
    // humne dierctly find by id kyon nahi kiya 
    // agar ek seleer hi hai hai wo and agar wo chahe toh dusre ka bhi toh prodcut jo seller hai usko bhi varianst aadd kar sakta hai isliye humne yeh condition lagayi 
    // ki wo product jo hai ussi seller ka hai tab hi allowed hai
    if(!product)
    {
        return res.status(404).json({
            message:"product not found",
            success:false,
            error:"Product not found"
        })
    }
    
    const files=req.files;
    const images=[]
    if (files && files.length > 0) {
    const uploadedImages = await Promise.all(
        files.map(async (file) => {
            const image = await uploadFile({ buffer: file.buffer, fileName: file.originalname });
            return image;
        })
    );
    images.push(...uploadedImages);
    }
     const {stock}=req.body; 
     const price=req.body.priceAmount;
     const attributes=JSON.parse(req.body.attributes || '{}'); 
     console.log(product,images,stock,price,attributes);
     product.variants.push({
        images:images,
        stock:stock,
        attributes:attributes,
        price:{
            amount:Number(price) || product.price.amount, 
            currency:req.body.priceCurrency || product.price.currency,
        }
     });
     await product.save();
     res.status(201).json({
        message:"variant created sucessfully",
        success:true,
        product
     }) 
}

export async function deleteProduct(req, res) {
    try {
        const productId = req.params.productId;
        const sellerId = req.user._id;

        const deletedProduct = await productModel.findOneAndDelete({
            _id: productId,
            seller: sellerId
        });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found or you are not authorized to delete this product",
                success: false
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product: deletedProduct
        });
    } catch (err) {
        console.error("Error in deleteProduct controller:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}
