import express from 'express';
import { placeKitOrder, getKitOrders, getKitOrderById, getAllKitOrders, updateKitOrderStatus } from '../controllers/kitOrderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const router = express.Router();

router.get('/kit-all', adminAuth, getAllKitOrders);
router.post('/', authUser, placeKitOrder);
router.get('/', authUser, getKitOrders);
router.get('/:id', authUser, getKitOrderById);
router.post('/status', adminAuth, updateKitOrderStatus); 

export default router;