const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let users = [
    {
        username: "demo@gmail.com",
        password: "1234"
    }
];


app.post("/signup", (req, res) => {
    console.log("Signup data received:", req.body);

    users.push({
        username: req.body.username,
        password: req.body.password
    });

    res.send({
        message: "Signup successful"
    });
});


app.get("/login", (req, res) => {
    console.log("Login user lookup:", req.query.username);

    const userFound = users.some(
        user =>
            user.username === req.query.username &&
            user.password === req.query.password
    );

    res.send(userFound);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;