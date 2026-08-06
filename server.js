require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.send("Verbindung erfolgreich!<br><br>" + result.rows[0].now);
  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler bei der Datenbankverbindung");
  }
});

app.listen(process.env.PORT || 3000);
