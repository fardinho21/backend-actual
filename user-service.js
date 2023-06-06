const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    passwordHash: String
});

const userModel = mongoose.model("users", UserSchema);

const createUser = app => {
    app.get("/create-user", (req, res) => {
        res.status(200).json("user-service::createUser() called...");
    });
};

const logInUser = app => {
    app.get("/login-user/", (req, res) => {
        res.status(200).json("user-service::logInUser() called...");
    });
};

module.exports = {createUser, logInUser};