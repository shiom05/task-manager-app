const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    requried: true,
  },
  userEmail: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    validate: {
      validator: async (value) => {
        const user = await User.findOne({ userEmail: value });
        return !user;
      },
      message: (prop) => `User Email ${prop.value} already exist`,
    },
  },
  userPassword: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.userPassword = await bcrypt.hash(this.userPassword, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.userPassword);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
