import mongoose, { Schema } from 'mongoose'

const blogSchema = new Schema({
    slug: { type: String, required: true },
    title: { type: String, required: true },
    posted: { type: String, required: false },
    description: { type: String, required: true },
    markdown: { type: String, required: true },
})

export default mongoose.models['blogSchema'] ||
    mongoose.model('blogSchema', blogSchema)
