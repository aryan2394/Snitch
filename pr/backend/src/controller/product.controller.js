export async function createProduct(req,res)
{
    const {title,description,priceAmount,priceCurrency}=req.body;
    const images=req.files;
    const user=req.user._id;
    console.log(title,description,priceAmount,priceCurrency,images,user)
    
}