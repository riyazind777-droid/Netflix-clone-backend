const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// WARNING: Serverless environments wipe global variables when they scale down.
// Consider connecting a real database (like MongoDB Atlas) later.
let users = [
    {
        username: "demo@gmail.com",
        password: "1234"
    }
];

// SIGNUP
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

// LOGIN
app.get("/login", (req, res) => {
    console.log("Login user lookup:", req.query.username);

    let userFound = users.some(user => 
        user.username === req.query.username && 
        user.password === req.query.password
    );

    res.send(userFound);
});

// CRUCIAL: Only run app.listen locally. Do NOT block Vercel deployment.
if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => {
        console.log("Server running locally on port 5000");
    });
}

// CRUCIAL: Export the app module so Vercel can process it as a function!
module.exports = app;
