const { User } = require("../models");

const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
};

const login = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(
            req.body.userName,
            req.body.pwd
        );
        const token = await user.generateAuthToken();
        let response = { ...defaultResponseObject };
        response.data = { user, token };
        res.status(200).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(401).send(response);
    }
};

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        let response = { ...defaultResponseObject };
        response.data = null;
        res.status(200).send(response);
    } catch (e) {
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
};

const find = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const findAll = async (req, res) => {
    try {
        const result = await User.find({});
        let response = { ...defaultResponseObject };
        response.message = "Data fetched successfully";
        response.data = result;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

const create = async (req, res) => {
    try {
        const { userName, pwd, department } = req.body;
        const user = new User({ userName: userName, pwd: pwd, department: department });
        await user.save();
        let response = { ...defaultResponseObject };
        response.message = "User created successfully";
        response.data = null;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

const update = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const deleteUser = async (req, res) => {
    try {
        console.log(req.body);
        const { userName } = req.body;
        await User.deleteOne({ userName: userName });
        let response = { ...defaultResponseObject };
        response.message = "User deleted successfully";
        response.data = null;
        res.status(200).send(response);
    } catch (e) {
        console.log(e);
        let response = { ...defaultResponseObject };
        response.error = e.message || e;
        response.success = false;
        res.status(400).send(response);
    }
}

module.exports = {
    login,
    logout,
    find,
    findAll,
    create,
    update,
    deleteUser,
}