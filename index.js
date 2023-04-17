const { ApolloServer, gql } = require("apollo-server");
const { default: mongoose } = require("mongoose");
const articleController = require("./controllers/article");
const commentController = require("./controllers/comment");
(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Article");
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
})();

const typeDefs = gql`
  type Article {
    title: String!
    content: String!
    comments: [Comment!]!
  }
  type Comment {
    title: String!
    content: String!
  }
  type Query {
    article(id: String!): Article
    articles: [Article]
  }
  type Mutation {
    createArticle(title: String!, content: String!): Article
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation: {
      createArticle: (_, args) => {
        return articleController.store(args.title, args.content);
      },
    },
    Query: {
      articles: async (_, args) => {
        const articles = await articleController.index(_, args);
        const articles_comments = articles.map((article) => ({
          ...article.toObject(),
          comments: async () => {
            const comments = await commentController.showArticle(article._id);
            return comments.map((comment) => comment.toObject());
          },
        }));
        return articles_comments;
      },
      article: async (_, args) => {
        const article = await articleController.show(_, args);
        article.comments = commentController.showArticle(article._id);
        return article;
      },
    },
  },
});

server.listen(3005).then(({ port }) => {
  console.log(port);
});
