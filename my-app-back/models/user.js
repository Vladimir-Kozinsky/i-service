import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    position: { type: String },
    password: { type: String },
    isAuth: { type: Boolean }
})

const User = mongoose.model('User', userSchema)

export default User;


