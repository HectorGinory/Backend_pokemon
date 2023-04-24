import mongoose from "mongoose"

const Pokemon = mongoose.model('Pokemon', new mongoose.Schema({
    name: String,
    type: String,
    details: String,
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date || undefined
  }
  }))

export default Pokemon