const express = require('express');
const db = require('./db/database');
// Remember that you don't have to specify index.js in the path 
// (e.g., ./routes/apiRoutes/index.js). If the directory has an index.js file in it, 
// Node.js will automatically look for it when requiring the directory.
const apiRoutes = require('./routes/apiRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Use apiRoutes
app.use('/api', apiRoutes);

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
