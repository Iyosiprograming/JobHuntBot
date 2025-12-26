import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  source: {
    type: String,
    default: "remoteok"
  },

  title: {
    type: String,
    required: true,
    index: true
  },

  company: {
    type: String,
    required: true
  },

  tags: {
    type: [String],
    index: true
  },

  location: {
    type: String,
    default: "Remote"
  },

  salary: {
    type: String,
    default: "Not specified"
  },

  applyUrl: {
    type: String,
    required: true,

  },

  sourceUrl: {
    type: String,
    unique: true,
    sparse: true,
    required: true
  },


  description: {
    type: String
  },

  publishedAt: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Job", jobSchema);
