import KitOrder from '../models/kitOrder.js';

export const placeKitOrder = async (req, res) => {
  try {
    const { address, products, totalAmount, discount, finalAmount, paymentMethod } = req.body;
    
    const newOrder = new KitOrder({
      user: req.user.id, 
      products: products.map(p => ({
        product: p._id,
        quantity: p.quantity || 1
      })),
      address,
      totalAmount,
      discount,
      finalAmount,
      paymentMethod
    });

    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getKitOrders = async (req, res) => {
  try {
    const orders = await KitOrder.find({ user: req.user.id })
      .populate('products.product')
      .sort('-createdAt');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getKitOrderById = async (req, res) => {
  try {
    const order = await KitOrder.findOne({ _id: req.params.id, user: req.user.id }).populate('products.product');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllKitOrders = async (req, res) => {
  try {
    const orders = await KitOrder.find({})
      .populate('products.product')
      .sort('-createdAt');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateKitOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'Order ID and status are required' });
    }

    const updatedOrder = await KitOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('products.product');

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
