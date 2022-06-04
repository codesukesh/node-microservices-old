const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app= express();
app.use(bodyParser.json());
app.use(cors());

const posts={};
const eventBusServiceURL = "http://event-bus-srv:4005"


const handleEvents=(eventType, data)=>{
    if(eventType === "postCreated"){
        const id= data.id;
        const title= data.title;

        posts[id]={
            id,
            title,
            comments:[]
        };
        // pId=id;/
    }
    else if(eventType === "commentCreated"){

        // const postId = req.body.data.postId;
        // const commentId = req.body.data.id;
        // const commentContent = req.body.data.content;
        const {id: commentId, content: commentContent, postId, status: commentStatus} = data;
        posts[postId]['comments'].push({
            id:commentId,
            content: commentContent,
            status: commentStatus
        });

        // pId=postId;
    }
    else if(eventType === "commentUpdated"){
        const {id,postId, status, content}=data;
        console.log("MODERATED: UPDATEComment", data)
        const post = posts[postId];
        const comment = post.comments.find(comment=> comment.id ===id);
        comment.status =status;
        comment.content = content;
    }
}

app.get('/posts', (req,res)=>{
    res.status(200).send(posts);
})

app.post("/events",(req,res)=>{
    //postId, postContent, comment[{commentId, content}...]
    console.log(`Event Recieved: ${req.body.type}`);
    const {type: eventType, data}= req.body;
    // let pId;
    handleEvents(eventType, data);
    // console.log(posts);
    res.status(201).send();
})

app.listen(4002, async ()=>{
    console.log("Listening to post 4002: Query service");

    const res = await axios.get(eventBusServiceURL+"/events");

    for(let event of res.data){
        console.log("Processing previus events...")
        handleEvents(event.type, event.data);
    }
})