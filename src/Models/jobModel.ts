import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    pubDate: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export default mongoose.model("Job", jobSchema);