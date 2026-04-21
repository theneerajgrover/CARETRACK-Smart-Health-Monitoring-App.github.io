const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/medical_db")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Database error:", err));-

const diseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: [String],
  risk: String,
  doctor: String,
});
const Disease = mongoose.model("Disease", diseaseSchema, "diseases");

app.get("/get-diseases", async (req, res) => {
  try {
    const data = await Disease.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
