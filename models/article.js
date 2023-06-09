const { default: mongoose, model } = require("mongoose");

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("articles", articleSchema);
