import mongoose, { Schema } from 'mongoose';

let User;

try {
  User = mongoose.model('User');
} catch {
  const userSchema = new Schema({
    name: String,
    email: String,
    password: String
  }, {
    timestamps: true
  });

  User = mongoose.model('User', userSchema);
}

export default User;
