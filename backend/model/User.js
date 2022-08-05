import mongoose from 'mongoose'

const Schema = mongoose.Schema

// user collection

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minimumLength: 4,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
  ],
})

export default mongoose.model('User', userSchema)
// users
