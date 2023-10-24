import User from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, lastname, email, password, location } = req.body;

  if (!name || !email || !password) {
    next("Please provide name, email, and password");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    next(`${email} is already registered. Please login.`);
  }

  const newUser = new User({ name, lastname, email, password, location });
  await newUser.save();
  const token = newUser.createJWT();
  res.status(201).json({
    success: true,
    message: "New user created successfully",
    user: {
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      location: newUser.location,
    },
    token,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next("please provide all fields");
  }

  // find user by email
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid username or password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid username or password");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({
    success: true,
    message: "Login successfully",
    user,
    token,
  });
};
