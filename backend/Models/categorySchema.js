const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure each category name is unique
    },
    description: {
        type: String,
        default: "" // Optional description for the category
    },
  
    image: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg" // Default placeholder image
    }
}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema);
