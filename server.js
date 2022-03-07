import Log from './Log.mjs';

import { readFileSync, writeFileSync } from 'fs';
import express, { json } from 'express';
import cors from 'cors';
const app = express();
const path = './data/logs.json';

// let t = JSON.parse(readFileSync('./data/logs.json'));
// let logs = [];
// logs = getLogs();

let logs = new Log(getLogs());


app.use(json());
app.use(cors());

class EventLog {
    
    constructor(description, quantity, event_type, date) {
        this._id = logs.superId;
        this.description = description;
        this.quantity = quantity;
        this.event_type = event_type;
        this.date = date;
    }
}

const eventType = {
    entry: 'entry',
    exit: 'exit'
}

app.get("/log", (req, res) => {
    res.json(logs.events);
});

app.get("/log/:id", (req, res) => {
    res.json(logs.events.filter(element => element._id == req.params.id)[0]);
});

app.post("/log", (req, res) => {
    let event = {};
    if(req.body) {
        event = new EventLog(req.body.description, req.body.quantity, eventType[req.body.event_type.toLowerCase()], new Date());
        logs.addEvent(event); 
    }
    res.json(event).status(200);
});

app.put("/log/:id", (req, res) => {
    let eventToUpdate = logs.events.filter(e => e._id === req.body._id)[0];
    for (const key in req.body) {
        if (Object.hasOwnProperty.call(eventToUpdate, key) && !key.includes('_id') && !key.includes('date')) {
            eventToUpdate[key] = req.body[key];
        }
    }
    res.json(eventToUpdate).status(200);
});

app.delete("/log/:id", (req, res) => {
    res.json(logs.deleteEvent(req.params.id)).status(200);
});

// writeLogs();

app.listen(3000, () => console.log('Is working!'));



function getLogs() {
    return JSON.parse(readFileSync(path));
}

function writeLogs() {
    setTimeout(() => writeFileSync(path, JSON.stringify(logs)), 5000);
}