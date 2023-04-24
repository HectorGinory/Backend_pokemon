import mongoose from "mongoose"

const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
    name: String,
    type: String,
    details: String,
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  }))

export default Pokemon