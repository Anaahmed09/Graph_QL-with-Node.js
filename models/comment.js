const { default: mongoose, model } = require("mongoose");

const commentSchema = mongoose.Schema({
  article_id: {
    type: mongoose.Types.ObjectId,
    ref: "articles",
    required: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("comments", commentSchema);
