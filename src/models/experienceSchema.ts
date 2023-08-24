import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema({
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: false },
    preview_image: { type: String, required: true },
    detailed: {
        type: {
            description: { type: String, required: true },
            images: { type: [String], required: true },
            alt: { type: [String], required: false },
        },
        required: true,
    },
})

export default mongoose.models['experienceSchema'] ||
    mongoose.model('experienceSchema', experienceSchema)
