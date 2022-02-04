const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

const schema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        unique: true
    },
    pwd: {
        type: String,
        minlength: 4,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
});

schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject._id;

    return userObject;
};

schema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString(), role: "admin" },
        config.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

schema.statics.findByCredentials = async (userName, pwd) => {
    const user = await User.findOne({ userName: userName });

    if (!user) {
        throw new Error("There is no user with given name");
    }

    const isMatch = pwd === user.pwd;

    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }

    return user;
};

const User = mongoose.model("users", schema);

(async () => {
    const count = await User.countDocuments();
    if (count) return;
    const user = new User({
        pwd: "12345",
        userName: "AD01",
        department: "AD"
    });
    user.save();
})();

exports.User = User;