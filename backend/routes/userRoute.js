import express from 'express'
import { loginUser,adminLogin,registerUser,getSavedAddresses, addAddress } from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/address',authUser, addAddress);
userRouter.get('/addresses',authUser, getSavedAddresses);


export default userRouter;