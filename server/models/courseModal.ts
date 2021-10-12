import mongoose from 'mongoose'
import {ICourse} from '../config/interface'

const courseSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    createBy : {
        type : String,
        required : [true, "Please add your createBy"],
    },
    name : {
        type : String,
        required : [true, "Please add your name"],
        trim: true
    },
    category : {
        required : true,
        type : Object
    },
    released : {
        type : Boolean,
        required : [true, "Please add your released"],
    },
    descriptions : {
        type : String,
        trim: true
    }
}, {
  timestamps: true
})

export default mongoose.model<ICourse>('course', courseSchema)