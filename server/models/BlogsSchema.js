import * as mongoose from 'mongoose'
import { type } from 'os'
const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    url: String,
    category: {
        type: [String],
        required: true
    },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true, strict: false })
export const Blog = mongoose.model("Blog", blogsSchema)