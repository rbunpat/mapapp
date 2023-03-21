const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 8080;

const githubLink = "<a href='https://github.com/rbunpat/mapapp'>https://github.com/rbunpat/mapapp</a>"

const db = new sqlite3.Database("coordinates.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the tracker database.");
});

db.run(`CREATE TABLE IF NOT EXISTS positions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", function (req, res) {
  res.send(
    "Tracker API Server, For documentation see " + githubLink
  );
});

app.get("/data", function (req, res) {
  res.send(
    "404 Not Found, See " + githubLink
  );
});

app.post("/data/save", function (req, res) {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).send("Latitude and longitude are required.");
  }

  const query = `INSERT INTO positions (latitude, longitude) VALUES (${latitude}, ${longitude})`;

  db.run(query, function (err) {
    if (err) {
      return res.status(500).send(`{
        "status": "400 Bad Request"
    }`);
    }
    res.send(`{
    "status": "200 OK"
}`);
  });
});

app.get("/data/json", function (req, res) {
  const limit = parseInt(req.query.limit) || 1;
  const query = `SELECT latitude, longitude FROM positions ORDER BY created_at DESC LIMIT ${limit}`;

  db.all(query, function (err, rows) {
    if (err) {
      return res.status(500).send(`{
        "status": "400 Bad Request"
    }`);
    }
    if (!rows.length) {
      return res.status(404).send(`{
        "status": "No Positions in Database"
    }`);
    }
    const positions = rows.map(row => ({latitude: row.latitude, longitude: row.longitude}));
    res.send(JSON.stringify(positions));
  });
});

app.get("/data/plain", function (req, res) {
  const limit = parseInt(req.query.limit) || 1;
  const query = `SELECT latitude, longitude FROM positions ORDER BY created_at DESC LIMIT ${limit}`;

  db.all(query, function (err, rows) {
    if (err) {
      return res.status(500).send("400 Bad Request, See " + githubLink);
    }
    if (!rows.length) {
      return res.status(404).send("No positions found.");
    }
    const coordinates = rows.map(row => `${row.latitude}, ${row.longitude}`).join("\n");
    res.send(coordinates);
  });
});

app.get("/data/array", function (req, res) {
  const limit = parseInt(req.query.limit) || 1;
  const query = `SELECT latitude, longitude FROM positions ORDER BY created_at DESC LIMIT ${limit}`;

  db.all(query, function (err, rows) {
    if (err) {
      return res.status(500).send("400 Bad Request, See " + githubLink);
    }
    if (!rows.length) {
      return res.status(404).send("No positions found.");
    }
    const positions = rows.map(row => `${row.latitude}, ${row.longitude}`);
    res.send(positions);
  });
});




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
