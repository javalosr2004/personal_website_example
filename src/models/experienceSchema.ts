import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    images: { type: [String], required: false },
})

export default mongoose.models['experienceSchema'] ||
    mongoose.model('experienceSchema', experienceSchema)
