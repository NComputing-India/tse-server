import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  accessToken: String,
});

export const Token = mongoose.model('Access-key', tokenSchema);
