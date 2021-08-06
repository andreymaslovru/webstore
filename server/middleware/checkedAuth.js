const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).json({ message: "нЕ АТВОРИЗОВАН" });
    }
    const dekoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // == ывзываем по цепочке последующий миддлевэйр
  } catch (error) {
    res.status(403).json({ message: "нЕ АТВОРИЗОВАН" });
  }
};
