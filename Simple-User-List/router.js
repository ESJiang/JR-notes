const express = require("express");
const router = express.Router();

let user = [
    { id: 1, name: "Ben", age: 20 },
    { id: 2, name: "John", age: 30 },
    { id: 3, name: "Chris", age: 40 },
    { id: 4, name: "Jane", age: 60 },
];

router.get("/api/users", (req, res) => res.status(200).json(user));
router.post("/api/user", (req, res) => {
    if (!req.body.name || !req.body.age) res.status(400).json("missing parameters");
    user.push({ id: user.length + 1, ...req.body });
    res.status(201).json({
        msg: "add user successfully",
        data: req.body,
    });
});

router.delete("/api/clearsingle", (req, res) => {
    const messageID = parseInt(req.query.id);
    const messageIndex = user.findIndex(user => user.id === messageID);
    if (messageIndex !== -1) {
        if (messageIndex !== user.length - 1) for (let i = messageIndex + 1; i < user.length; i++) --user[i].id;
        const deletedMessage = user.splice(messageIndex, 1)[0];
        console.log("deletedMessage", deletedMessage);
        res.status(201).json({ msg: "delete successfully", deleteData: deletedMessage });
    } else res.status(404).json({ msg: "cannot delete" });
});

router.delete("/api/clear", (req, res) => {
    user = [];
    res.status(201).send("User list has been cleared");
});

module.exports = router;
