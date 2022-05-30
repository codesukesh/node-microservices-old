const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={};

app.get("/posts", (req, res)=>{
    res.status(200).send(posts);
});

app.post("/posts", async (req,res)=>{
    let id = randomBytes(4).toString('hex');
    let {title}=req.body;
    posts[id]={
        id,title
    };

    await axios.post("http://localhost:4005/events", {
        type: "postCreated",
        data: {
            id, title
        }
    })
    res.status(201).send(posts[id]);
});

app.post("/events", (req,res)=>{
    console.log(`Event Recieved: ${req.body.type}`)
    res.send({});
})

app.listen(4000, ()=>{
    console.log("Listening to posts 4000");
});