import { v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


// Add product
const addProduct = async (req,res) => {
    try {
        const { name,description,price, category, bestSeller, discount, rating, reviews} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 &&  req.files.image2[0]
        const image3 = req.files.image3 &&  req.files.image3[0]
        const image4 = req.files.image4 &&  req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> (item !== undefined))

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            discount: Number(discount || 0),
            bestSeller: bestSeller === "true" ? true : false,
            image: imagesUrl,
            date:Date.now(),
            rating: Number(rating || 0),  // Add rating
            reviews: Number(reviews || 0) 
        }

        console.log(productData)

        const product = new productModel(productData)
        await product.save()
        
        res.json({success:true,messages:"Product Added"})
    }  
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.messsage})
    }
}

// List products
const listProducts = async (req,res) => {
    try {

        const products = await productModel.find({});
        res.json({success:true,products})
    } catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Remove product
const removeProduct = async (req,res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// single product info
const singleProducts = async (req,res) => {
    try {
        
        const { productId } = req.body
        const products = await productModel.findById(productId)

        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// Edit product
const editProduct = async (req, res) => {
    try {
        const { productId, name, description, price, category, bestSeller, discount, rating, reviews, stock } = req.body;

        // Find the existing product by ID
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Handle images if they are provided in the request
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload new images if provided
        let imagesUrl = product.image; // Retain the old images if none are provided
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        // Update product data
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.bestSeller = bestSeller !== undefined ? bestSeller : product.bestSeller;
        product.image = imagesUrl;
        product.discount = discount !== undefined ? Number(discount) : product.discount;
        product.rating = rating !== undefined ? Number(rating) : product.rating;  // Update rating
        product.reviews = reviews !== undefined ? Number(reviews) : product.reviews; // Update reviews
        product.stock = stock !== undefined ? stock === "true" : product.stock; 

        // Save the updated product to the database
        await product.save();

        res.json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProducts, editProduct };



