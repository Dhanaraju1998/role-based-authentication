const router = require("express").Router();
const UserSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, "dhanaraju", { expiresIn: "30d" });
};

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await UserSchema.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid Email address" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // If the password is valid, generate a token and send the user details in the response
    if (user && isPasswordValid) {
      let userDetails = {
        token: generateToken(user._id),
        role: user.role,
      };

      res.status(200).json({ userDetails, message: "Login successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;
