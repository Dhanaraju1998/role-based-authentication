const router = require("express").Router();
const UserSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, "dhanaraju", { expiresIn: "30d" });
};

router.post("/", async (req, res) => {
  const { firstname, lastname, middlename, email, password, dob, avatar } =
    req.body;

  try {
    // Check if user with the given email already exists
    let existingEmail = await UserSchema.findOne({ email: email });

    if (existingEmail) {
      // If email exists, send an error response
      return res.status(400).json("Email already exists");
    }

    // Generate the username automatically
    const random_number = Math.ceil(Math.random() * 1000);
    const newUsername = `${firstname
      .toLowerCase()
      .slice(0, 1)}${lastname.toLowerCase()}@${random_number}`;

    // Combine the firstname and lastname to create a fullname of the user
    let newFullname = "";
    if (middlename !== undefined && middlename !== "") {
      newFullname = `${firstname}${middlename} ${lastname}`;
    } else {
      newFullname = `${firstname} ${lastname}`;
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the generated username
    const userData = await UserSchema.create({
      firstname,
      middlename,
      lastname,
      fullname: newFullname,
      username: newUsername,
      email,
      password: hashedPassword,
      dob,
      avatar,
    });

    if (userData) {
      const details = {
        _id: userData._id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        fullname: userData.fullname,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        dob: userData.dob,
        avatar: userData.avatar,
        token: generateToken(userData._id),
      };
      res
        .status(201)
        .json({ data: details, message: "User registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Registration failed, ${error.message}`);
  }
});

module.exports = router;
