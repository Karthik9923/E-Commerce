import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"; // Ensure the userModel is imported correctly

// Placing Orders using COD method
const placeOrder = async (req, res) => {
    try {
        // Get the userId from the request (from the token via authUser middleware)
        const { id: userId } = req.user; 

        // Destructure the request body
        const { items, amount, address } = req.body;

        // Validate the request body
        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid userId" });
        }

        // Create the order data
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: new Date()
        };

        // Save the order
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Respond with success
        res.json({ success: true, message: "Order Placed", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Placing Orders using razorpay

const placeOrderRazor = async (req,res) => {
    
}


// All Orders data for admin panel

const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// User Data for front end

const userOrders = async (req, res) => {
    try {
        // Assuming 'userId' is available in req.user (set by authUser middleware)
        const { id: userId } = req.user;  // Destructure 'id' as 'userId'

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID not found in token" });
        }

        // Fetch the orders for the user
        const orders = await orderModel.find({ userId });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Order Status from admin panel

const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { placeOrder, placeOrderRazor, allOrders, userOrders, updateStatus }