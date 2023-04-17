const commentModel = require("../models/comment");
const showArticle = async (article_id) => {
  try {
    console.log(article_id)
    const comments = await commentModel.find({ article_id });
    return comments;
  } catch (error) {
    return error;
  }
};

module.exports = { showArticle };
