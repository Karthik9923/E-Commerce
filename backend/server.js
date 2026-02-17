import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import categoryRoutes from './routes/categoryRoute.js';
import kitOrderRoutes from './routes/kitOrder.js';
import blogRoute from './routes/blogRoute.js' 

// App config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/category', categoryRoutes);
app.use('/api/kit-orders', kitOrderRoutes);
app.use("/api/blogs", blogRoute);


app.get('/',(req,res)=> {
    res.send("API Working")
})

app.listen(port, ()=> (
    console.log("Server started on PORT :"+ port)
))