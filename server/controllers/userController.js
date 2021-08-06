const ApiError = require("../err/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Basket } = require("../models/models");

const generateJWT = (email, id) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class userController {
  async registration(req, res) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Неверный логин или пароль."));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email существует.")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJWT(user.id, user.email);
    return res.json({ token });
  }

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest);
    }
    res.json(id);
  }
}

module.exports = new userController();
