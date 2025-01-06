import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  snippet: { type: String, required: true },
}, {timestamps: true});

export const Blog = mongoose.model('Blog', blogSchema)
