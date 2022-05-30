const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events=[];

app.post('/events', (req,res)=>{
    const event = req.body;
    // console.log(event);
    axios.post("http://localhost:4000/events", event).catch(err=> console.log("EVENT BUS: to POST SERVICE: ", event));
    axios.post("http://localhost:4001/events", event).catch(err=>console.log("EVENT BUS: To comment service", event));
    axios.post("http://localhost:4002/events", event).catch(err=> console.log("EVENT BUS: to QUERY SERVICE: ",event));
    axios.post("http://localhost:4003/events", event).catch(err=>console.log("EVENT BUS: to MEDERATION SERVICE: ",event));

    events.push(event);

    res.status(200).send({status:"OK"});
})

app.get('/events', (req,res)=>{
    res.send(events);
})


app.listen(4005, ()=>{
    console.log("Listenting on post 4005: Event Bus");
})
