import mongoose from 'mongoose';
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const chatGlobalSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  time : {
    type : Date,
  },
  content : {
    type : String,
    required : [true, "Please add your content"],
  },
  user : {
    type : String,
  }
  }, {
    timestamps: true
})

chatGlobalSchema.plugin(aggregatePaginate)

export default mongoose.model('chatGlobal', chatGlobalSchema)