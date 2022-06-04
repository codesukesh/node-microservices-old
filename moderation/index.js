const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const eventBusServiceURL = "http://event-bus-srv:4005"

app.use("/events", async(req,res)=>{
    const event = req.body;
    console.log(`Event Recieved: ${req.body.type}`);
    const {type: eventType, data: {id: commentId, content:commentContent, postId}} = req.body;
    if(eventType === "commentCreated"){
        const status = commentContent.includes('orange') ? 'rejected' : 'approved';
        // if(commentContent.includes('orange')){
        //     commentStatus= 'Rejected';
        // }
        // else{
        //     commentStatus="Approved";
        // }

        await axios.post(eventBusServiceURL+"/events", {
            type: "commentModerated",
            data:{
                id: commentId,
                content: commentContent,
                postId,
                status
            }
        })
        .catch(err=> console.log(err));
    }

    res.send({status:'OK'});
});

app.listen(4003, ()=>{
    console.log("Listening on port 4003: Moderation service");
});