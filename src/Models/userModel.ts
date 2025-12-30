import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    tgId:{
        type:String,
        required:true,
        unique:true
    },
    tgUsername:{
        type:String,
    },
    filter:{
        type:[String],
        default:[""]
    }
});

export default mongoose.model("User", userSchema);

