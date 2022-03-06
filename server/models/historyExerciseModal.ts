import mongoose from 'mongoose';
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const historyExerciseSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    categoryId : {
      required : true,
      type : mongoose.Types.ObjectId
    },
    courseId : {
      required : true,
      type: mongoose.Types.ObjectId,
    },
    score : {
      type : Number,
    },
    status : {
      type : Number,
    },
    lengthYourAnswer : {
      type : Number,
    },
    lengthQuestion : {
      type : Number,
    }
}, {
  timestamps: true
})

historyExerciseSchema.plugin(aggregatePaginate)

export default mongoose.model('historyExercise', historyExerciseSchema)