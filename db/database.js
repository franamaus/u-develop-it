// This statement sets the execution mode to verbose to produce messages in the terminal 
//regarding the state of the runtime. 
// This feature can help explain what the application is doing, specifically SQLite.
const sqlite3 = require('sqlite3').verbose();

// connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the election database.');
});


module.exports = db;