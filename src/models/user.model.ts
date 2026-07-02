import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
});

export const User = mongoose.model('nc-users', userSchema);
