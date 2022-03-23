const { application } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api", function (req, res) {
    res.json({
        mensaje: "John Doe",
    });
});
app.post("/api/login", (req, res) => { 
    const user = {
        id: 1,
        name: "John Doe",
        email: "henrry@gmail.com"
    }
    jwt.sign({user: user}, 'secretkey', {expiresIn: "1h" }, (err, token) => {
        res.json({
            token: token,
        });
    });
         
  
});
app.post("/api/posts", verifyToken, (req , res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});
//Authorization: bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


app.listen(3000, function() {
    console.log("Server running on port 3000");
})