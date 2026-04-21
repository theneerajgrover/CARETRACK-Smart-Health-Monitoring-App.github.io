const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/medical_db")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection error:", err));

const diseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: [String],
  risk: String,
  doctor: String,
});

const Disease = mongoose.model("Disease", diseaseSchema);

module.exports = Disease;
