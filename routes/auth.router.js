const { Router }  = require("express");
const passport = require("passport");

const AuthService = require("../services/auth.service");

const authRouter = Router();
const service = new AuthService();

authRouter.post("/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
     const user = req.user;
     res.json(await service.SignToken(user.dataValues));
    } catch (error) {
      next(error);
    }
});

authRouter.post("/recovery",
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.SendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
});

authRouter.post("/change-password", async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const rta = await service.ChangePassword(token, newPassword);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;