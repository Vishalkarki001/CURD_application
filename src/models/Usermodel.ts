import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the username"],

  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
  },
  number: {
    type: String,
    required: [true, "Please provide the number"],
    unique: true,
  },
});


const Usermodel = mongoose.models.User || mongoose.model("User", userSchema);

export { Usermodel };
