import userModel from '../models/userModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for User Login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false, message:"User Does Not Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch) {

            const token = createToken(user._id)
            res.json({success:true,token})

        }
        else {
            res.json({success:false, message: "Invalid Credentials"})
        }
    }
    catch(error) { 
        console.log(error)
        res.json({success:false,message:error.message})

    }
}


// Route for User Registration
const registerUser = async (req,res) => {

    try {
        const { name,email,password } = req.body;

        //Checking user already exist or not
        const exists = await userModel.findOne({email})
        if(exists) {
            return res.json({success:false, message:"User Already Exists"})
        }
        
        // validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if(password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // Hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    }
    catch(error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Route for Admin Login

const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// Get saved addresses for the logged in user
const getSavedAddresses = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, addresses: user.addresses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };


  const addAddress = async (req, res) => {
    try {
      const userId = req.user.id;
      const address = req.body; // Expecting a complete address object
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.addresses.push(address);
      await user.save();
      res.json({ success: true, message: 'Address saved', addresses: user.addresses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  


export {loginUser, registerUser, adminLogin, getSavedAddresses, addAddress}