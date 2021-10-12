import mongoose from 'mongoose'
import {IQuestions} from '../config/interface'

const questionSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    name : {
        type : String,
        required : [true, "Please add your name"],
        trim: true
    },
    category : {
        required : true,
        type : Object
    },
    answers : {
        type : Array,
        required : [true, "Please add your Answers"],
        ref : 'answer'
    }
}, {
  timestamps: true
})

export default mongoose.model<IQuestions>('question', questionSchema)