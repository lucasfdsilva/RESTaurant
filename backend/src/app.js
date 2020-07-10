const express = require('express');
const routes = require('./routes');
const cors = require('cors')

//Configuring Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes.openRoutes);
app.use(routes.protectedRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;