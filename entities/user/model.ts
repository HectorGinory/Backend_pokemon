import mongoose from "mongoose"

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    password: {
      type: String,
      select: false,
      required: true
    },
    email:{
        type: String,
        unique: true
    }
  }, {versionKey: false}))

export default User