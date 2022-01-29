const create = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const findAsPDF = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const find = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const update = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

const email = async (req, res) => {
    console.log(req);
    res.json({ success: true });
}

module.exports = {
    create,
    findAsPDF,
    find,
    update,
    email
}