const express = require('express');
// This statement sets the execution mode to verbose to produce messages in the terminal 
//regarding the state of the runtime. 
// This feature can help explain what the application is doing, specifically SQLite.
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the election database.');
});

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World'
    });
});

// Default response for any other request(Not Found) Catch all
// this below needs to be the last route, right above the app.listen
app.use((req, res) => {
    res.status(404).end();
  });

// Start server after DB connection
db.on('open', () => {
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
})
