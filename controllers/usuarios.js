const { response, request } = require("express");

const getUsaurios = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "get API",
    query
  });
};

const postUsaurios = (req = request, res = response) => {
  const { email, password } = req.body;

  res.json({
    msg: "get API",
    email,
    password,
  });
};

const putUsaurios = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "get API",
    id,
  });
};

module.exports = { getUsaurios, postUsaurios, putUsaurios };
