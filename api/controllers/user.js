const { generateAccessToken } = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");

const Create = async (req, res) => {
  const body = req.body;

  await check("email").isEmail().run(req);
  await check("password").notEmpty().run(req);
  await check("first_name").notEmpty().run(req);
  await check("last_name").notEmpty().run(req);
  await check("role").notEmpty().run(req);
  await check("status").notEmpty().run(req);

  const result = await validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      code: 400,
      errors: result.array(),
    });
  }

  User.findOne({ email: body.email }, async (err, result) => {
    if (err)
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Error.",
      });

    if (result) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "This Email already have in system.",
      });
    }

    const user = new User(body);

    user.email = user.email.toLowerCase();
    await user
      .save()
      .then(() => {
        console.log(`(Service) User created (ID: ${user._id}).`);
        return res.status(201).json({
          code: 201,
          status: "Success.",
          message: "User is created.",
        });
      })
      .catch(() => {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Error please try again.",
        });
      });
  });
};

const GetUser = (req, res) => {
  User.findOne({ email: req.user.email }, (err, user) => {
    if (err)
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "User not found.",
      });
    if (!user)
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "User not found.",
      });

    console.log(`(Service) User get (ID: ${user._id}).`);
    return res.status(200).json({
      code: 200,
      status: "Success.",
      data: user,
    });
  });
};

const Login = async (req, res) => {
  const body = req.body;
  User.findOne(
    { email: body.email.toLowerCase(), password: body.password },
    async (err, user) => {
      if (!user) {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Wrong E-mail or Password please try again.",
        });
      }

      const token = await generateAccessToken(body.email.toLowerCase());
      user.token = await token;
      await user.save();
      console.log(
        `(Service) E-mail ${user.email} has login (ID: ${user._id}).`
      );
      return res.status(200).json({
        code: 200,
        status: "Success.",
        data: user,
      });
    }
  );
};

const ReadNotify = async (req, res) => {
  const body = req.body;
  User.findOne({ _id: body.id }, async (err, user) => {
    if (err)
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Error please try again.",
      });

    if (!user) {
      if (body.id !== "clear") {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Can't find notify.",
        });
      }
    }

    let temp = await user.notify;
    let unread = [];

    if (body.index !== null) {
      await temp.map((value, index) => {
        if (index !== body.index) {
          unread.push(value);
        }
      });
    }

    user.notify = await unread;

    await user
      .save()
      .then(() => {
        return res.status(200).json({
          code: 200,
          status: "Success.",
          message: "Read notify success.",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Error.",
        });
      });
  });
};

module.exports = {
  Create,
  GetUser,
  Login,
  ReadNotify,
};
