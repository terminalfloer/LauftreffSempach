require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const mongoDBConnection =
  process.env.MONGODB_CONNECTION ||
  "mongodb://root:example@localhost:27017/?authMechanism=DEFAULT";
mongoose.connect(mongoDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Gästebuch-Eintragsschema
const guestbookEntrySchema = new mongoose.Schema({
  name: String,
  message: String,
});

const GuestbookEntry = mongoose.model("GuestbookEntry", guestbookEntrySchema);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route zur Verarbeitung von Formularübermittlungen
app.post("/submit", async (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  // Speichere die Daten in der MongoDB
  const newEntry = new GuestbookEntry({ name, message });
  await newEntry.save();
  res.status(201).send()
});

app.get("/guestbookentries", async (req, res) => {
  const allEntries = await GuestbookEntry.find();
  return res.json(allEntries);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
