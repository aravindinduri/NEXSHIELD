import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  organizationName: { type: String, required: true },
  subscriptionStatus: { type: Boolean, default: true },
});

const User = mongoose.model('User', userSchema);
export default User;
