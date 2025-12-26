import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    telegramUsername: {
        type: String,
        required: false
    },
    filter: {

        title: String,
        tags: [String],
        location: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("User", userSchema);