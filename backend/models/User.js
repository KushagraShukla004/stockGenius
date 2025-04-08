import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import validator from "validator";

const userSchema = new Schema({
  name: {
    type: "String",
    required: [true, "Please enter your name."],
    trim: true,
  },
  email: {
    type: "String",
    required: [true, "Please enter your email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email."],
  },
  password: {
    type: "String",
    required: [true, "Please provide your password."],
    minlength: [8, "Length should be greater than 8 characters!"],
    select: false,
  },
  passwordChangedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// MIDDLEWARE: Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 12);
  next();
});

// INSTANCE METHOD: a custom method that can be defined on a schema and can call on individual documents (instances) of a model.
// Here it is used to Check password correctness
userSchema.methods.correctPassword = async function (enteredPassword, userDbPassword) {
  return await compare(enteredPassword, userDbPassword);
};

const User = model("User", userSchema);
export default User;
