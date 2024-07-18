const express = require("express");

const port = 108;
let server = express();

server.get("/", (req, res) => {
    console.log("/ hit") 
    res.send("root: server is running");
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});