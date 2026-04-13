const testApi = (req, res) => {
  res.json({
    message: "Controller is working",
    status: "SUCCESS"
  });
};

module.exports = { testApi };
