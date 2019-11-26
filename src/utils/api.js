const axios = require("axios");

exports.fetchAllArticles = (topic, sort_by, order) => {
  console.log(topic);
  return axios
    .get("https://ncdlc.herokuapp.com/api/articles", {
      params: { topic, sort_by, order }
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

exports.fetchCommentsByArticleId = article_id => {
  return axios
    .get(`https://ncdlc.herokuapp.com/api/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

exports.fetchAllUsers = users => {
  return axios
    .get(`https://ncdlc.herokuapp.com/api/users`, {
      params: { users }
    })
    .then(({ data: { users } }) => {
      return users;
    });
};

exports.changeVotes = (inc_votes, id, type) => {
  return axios.patch(`https://ncdlc.herokuapp.com/api/${type}/${id}`, {
    inc_votes
  });
};
