const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes}=require('crypto');
const cors = require('cors');
const axios = require("axios");

const app = express()
app.use(bodyParser.json()); 
app.use(cors());

const commentsByPostId = {};
const eventBusServiceURL = "http://event-bus-srv:4005";

app.get('/posts/:id/comments', (req,res)=>{
    const postId = req.params.id;
    res.status(200).send(commentsByPostId[postId] || []);
})
app.post('/posts/:id/comments', async(req,res)=>{
    let commentId=randomBytes(4).toString('hex');
    const {content}= req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content:content, status: 'pending'});

    commentsByPostId[req.params.id] = comments;

    await axios.post(eventBusServiceURL+"/events", {
        type: "commentCreated",
        data:{
            id:commentId,
            content,
            postId:req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments);
})

app.post('/events', async (req,res)=>{
    console.log(`Event Received: ${req.body.type}`);
    const {type: eventType, data} = req.body;

    if(eventType ==="commentModerated"){
        // let {id: commentId, content: commentContent, postId, status: commentStatus}= req.body.data;
        const {id, postId, status, content} = data;

        const comments = commentsByPostId[postId];

        const comment = comments.find(item=> item.id===id)

        comment.status=status;

        await axios.post(eventBusServiceURL+'/events', {
            type: 'commentUpdated',
            data:{
                id,
                postId,
                status,
                content
            }
        }).catch(err=> console.log("comment service: comment moderated could not emit commentUpdate event to event bus"));
        console.log("comentModerated, emits commentUpdated event", status)
    }
    res.send({});
})


app.listen(4001, ()=>{
    console.log("listening to port 4001: comment service");
})