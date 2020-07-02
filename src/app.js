const express = require('express');
const routes = require('./routes');
const cors = require('cors')

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

//Configuring Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes.openRoutes);
app.use(routes.protectedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;