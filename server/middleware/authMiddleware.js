const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization; // Bearer fregergerger
    console.log(req.headers.authorization, "req.headers");
    if (!token) {
      return res.status(401).json({ message: "нЕ АТВОРИЗОВАН" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // == ывзываем по цепочке последующий миддлевэйр
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "нЕ АТВОРИЗОВАН1" });
  }
};
