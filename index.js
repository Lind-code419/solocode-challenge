import express from "express";

// use the SQL methods in the API routes below
import {joinQueue, leaveQueue, joinTaxiQueue, taxiDepart,taxiQueueLength, queueLength} from './taxi.sql.js';

const app = express();

app.use(express.static('public'))

// add middleware to make post routes work
app.use(express.json());

const PORT = process.env.PORT || 4015;

// passenger joins the queue
app.post('/api/passenger/join', (req, res) => {
    joinQueue();
    res.json({
        message : 'join queue'

    })
})

// passenger leaves the queue
app.post('/api/passenger/leave', (req, res) => {
    leaveQueue();
    res.json({
        message : 'leave queue'
    })
});

// taxi joins the queue

app.post('/api/taxi/join', (req, res) => {
    joinTaxiQueue();
    res.json({
        message : 'taxi join queue'
    })
});

// Note there needs to be at least 12 people in the queue for the taxi to depart
app.post('/api/taxi/depart', (req, res) => {
    
    taxiDepart();
    res.json({
        message : 'taxi depart from queue'
    })
});


// return the number of people in the queue
app.get('/api/passenger/queue', (req, res) => {
    //  return test the API call
    res.json({
        queueCount : queueLength()
    })
});

// return the number of taxis in the queue
app.get('/api/taxi/queue', (req, res) => {
    
    res.json({
        queueCountTaxi : taxiQueueLength()
    })
});

app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))