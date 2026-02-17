import mongoose from 'mongoose';

// Define a schema for an address
const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  street:    { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  zipcode:   { type: String, required: true },
  country:   { type: String, required: true },
  phone:     { type: String, required: true },
});

// Updated user schema with addresses as an array of addressSchema objects
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{ type: String, required: true, unique: true },
  password:{ type: String, required: true },
  cartData: { type: Object, default: {} },
  addresses: { type: [addressSchema], default: [] } // New field for storing multiple addresses
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
