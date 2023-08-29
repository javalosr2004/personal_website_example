import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema({
    slug: { type: String, required: true },
    name: { type: String, required: true },
    job_title: { type: String, required: false },
    start_date: { type: String, required: true },
    end_date: { type: String, required: false },
    detailed: {
        type: {
            topic: { type: String, required: true },
            logo: { type: String, required: true },
            information: { type: [String], required: true },
        },
        required: true,
    },
})

export default mongoose.models['experienceSchema'] ||
    mongoose.model('experienceSchema', experienceSchema)
