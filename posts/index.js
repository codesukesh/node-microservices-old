const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={};
const eventBusServiceURL = "http://event-bus-srv:4005"

app.get("/posts", (req, res)=>{
    res.status(200).send(posts);
});

app.post("/posts/create", async (req,res)=>{
    let id = randomBytes(4).toString('hex');
    let {title}=req.body;
    posts[id]={
        id,title
    };

    await axios.post(eventBusServiceURL+"/events", {
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
    console.log("v3");
    console.log("Listening to posts 4000");
});