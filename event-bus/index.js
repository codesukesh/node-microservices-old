const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events=[];
const postsServiceURL = "http://posts-clusterip-srv:4000"


app.post('/events', (req,res)=>{
    console.log(`Event Recieved: ${req.body.type}`)
    const event = req.body;
    // console.log(event);
    axios.post(postsServiceURL+"/events", event).catch(err=> {
        console.log("EVENT BUS: to POST SERVICE: ", event);
        console.log(err);
    });
    axios.post("http://comments-serv:4001/events", event).catch(err=>console.log("EVENT BUS: To comment service", event, err.message));
    axios.post("http://query-serv:4002/events", event).catch(err=> console.log("EVENT BUS: to QUERY SERVICE: ",event, err.message));
    axios.post("http://moderation-serv:4003/events", event).catch(err=>console.log("EVENT BUS: to MEDERATION SERVICE: ",event, err.message));

    events.push(event);

    res.status(200).send({status:"OK"});
})

app.get('/events', (req,res)=>{
    res.send(events);
})


app.listen(4005, ()=>{
    console.log("Listenting on post 4005: Event Bus");
})
