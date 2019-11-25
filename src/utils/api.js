const axios = require("axios");

exports.fetchAllArticles = topic => {
  return axios
    .get("https://ncdlc.herokuapp.com/api/articles", {
      params: { topic }
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

exports.fetchAllTopics = () => {
  return axios
    .get("https://ncdlc.herokuapp.com/api/topics")
    .then(({ data: { topics } }) => {
      return topics;
    });
};

exports.fetchArticleById = article_id => {
  return axios
    .get(`https://ncdlc.herokuapp.com/api/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};
