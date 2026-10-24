function notFoundHandler(req, res) {
  res.status(404).json({ message: "This route does not exist" });
}

// Express recognises error handlers by their 4 arguments, so `next` must stay
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error("ERROR", req.method, req.path, err.message);

  if (res.headersSent) return;

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({ message: `A document with that ${field} already exists` });
  }

  res.status(500).json({ message: "Internal server error. Check the server console" });
}

module.exports = { notFoundHandler, errorHandler };
