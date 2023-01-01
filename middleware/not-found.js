const notFound = (req, res) => {
  res.status(404).send("Route doesnot exists");
};

module.exports = notFound;
