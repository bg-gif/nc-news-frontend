const axios = require("axios");

exports.fetchAllArticles = ({ topic, sort_by, order, author }) => {
  return axios
    .get("https://ncdlc.herokuapp.com/api/articles", {
      params: { topic, sort_by, order, author }
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

exports.changeVotes = ({ inc_votes, id, type, body }) => {
  return axios
    .patch(`https://ncdlc.herokuapp.com/api/${type}/${id}`, {
      inc_votes,
      body
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

exports.postArticle = (title, author, body, topic) => {
  return axios
    .post("https://ncdlc.herokuapp.com/api/articles", {
      title,
      topic,
      author,
      body
    })
    .then(({ data: { article } }) => {
      return article;
    });
};

exports.postComment = (article_id, username, body) => {
  return axios
    .post(`https://ncdlc.herokuapp.com/api/articles/${article_id}/comments`, {
      username,
      body
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

exports.delete = (type, id) => {
  return axios
    .delete(`https://ncdlc.herokuapp.com/api/${type}/${id}`)
    .then(() => {
      console.log("delete successful");
    });
};

exports.updateTopics = (description, slug) => {
  return axios
    .post("https://ncdlc.herokuapp.com/api/topics", {
      description,
      slug
    })
    .then(response => {
      return response;
    });
};

exports.fetchAllUsers = () => {
  return axios
    .get("https://ncdlc.herokuapp.com/api/users")
    .then(({ data: { users } }) => {
      return users;
    });
};

exports.postUser = (username, avatar_url, name) => {
  return axios
    .post("https://ncdlc.herokuapp.com/api/users", {
      username,
      avatar_url,
      name
    })
    .then(({ data: { user } }) => {
      return user;
    });
};

exports.postTopic = (slug, description) => {
  return axios
    .post("https://ncdlc.herokuapp.com/api/topics", {
      slug,
      description
    })
    .then(({ data }) => {
      return data.topic;
    });
};

exports.fetchUserByUserName = username => {
  return axios
    .get(`https://ncdlc.herokuapp.com/api/users/${username}`)
    .then(({ data: { user } }) => {
      return user;
    });
};

exports.fetchCommentsByUserId = username => {
  return axios
    .get(`https://ncdlc.herokuapp.com/api/users/${username}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};
