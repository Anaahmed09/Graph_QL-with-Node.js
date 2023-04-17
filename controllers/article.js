const { default: mongoose } = require("mongoose");
const articleModel = require("../models/article");
const commentModel = require("../models/comment");

const index = async (_, args) => {
  try {
    const articles = await articleModel.find();
    return articles;
  } catch (error) {
    return error;
  }
};

const show = async (_, args) => {
  try {
    const article = articleModel.findById(args.id);
    return article;
  } catch (error) {
    return error;
  }
};

const store = async (title, content) => {
  try {
    const article = await articleModel.create({ title, content });
    console.log(article);
    return article;
  } catch (error) {
    return error;
  }
};

module.exports = { index, show, store };
